import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User  from "../Models/user.js";
import Role  from "../Models/Role.js"; // Import the User and Role models

const generateHashedPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.statusCompte === 'bloqué') {
        return res.status(409).json({ message: 'Account is blocked. Contact administrator for assistance.' });
      }
      return res.status(409).json({ message: 'User already exists' });
    }

    // Créer un nouvel utilisateur avec les informations fournies
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    user.statusUser = 'nonConfirmé';
    user.statusCompte = 'actif';

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    const roles = await Role.find({ name: { $in: req.body.roles } });

    // Si aucun rôle n'est spécifié dans req.body.roles, ajoutez le rôle "user" par défaut.
  if (roles.length === 0) {
    const defaultRole = await Role.findOne({ name: 'user' });
    if (defaultRole) {
      roles.push(defaultRole);
    }
  }

    // Assigner les rôles à l'utilisateur
    user.roles = roles.map(role => role._id);
    await user.save();

    // Envoyer l'e-mail de confirmation à l'administrateur
    const transporter = nodemailer.createTransport({
      // Configuration du service d'envoi d'e-mails (par exemple, Gmail)
      service: 'gmail',
      auth: {
        user: 'Bozyacine1@gmail.com',
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: 'Bozyacine1@gmail.com',
      to: 'Bozyacine1@gmail.com',
      subject: 'New User Registration',
      html: `
        <p>Hello Admin,</p>
        <p>A new user has registered:</p>
        <p>Username: ${username}</p>
        <p>Email: ${email}</p>
        <p>Please confirm the user registration by clicking on the following link:</p>
        <p>http://localhost:9090/user/confirm-user/${user._id}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    res.json({ message: 'User registration successful. Confirmation email sent to admin.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (user.statusUser == "nonConfirmé") {
      return res.status(401).send({ message: "Account not confirmed yet." });
    }
    if (user.statusCompte == "bloqué") {
      return res.status(401).send({ message: "Account is bloque yet." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.jwt_Secret, {
      expiresIn: 31557600, // 24 hours
    });

    var authorities = [];

    if (user.roles && Array.isArray(user.roles)) {
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
    }

    req.session.token = token;

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error signing in' });
  }
};


const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error signing out' });
  }
};

export { signup, signin, signout };
