import User  from "../Models/user.js";
import Role  from "../Models/Role.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";




const findAllUser = async (req, res) => {
  const username = req.query.username;
  const condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  try {
    const users = await User.find(condition);
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('username email profile');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while retrieving user profile." });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error updating user profile' });
  }
};

const forgotPassword = async(req, res) => {
  try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      console.log(user.username)
      const resetToken = generateResetToken(); // Générer un token de réinitialisation temporaire côté serveur
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // Définir une expiration d'une heure
      const resetPasswordLink = `http://localhost:4200/auth/reset-password`;

      await user.save();
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'Bozyacine1@gmail.com',
              pass: process.env.pass,
          },
      });
      const mailOptions = {
          from: 'Bozyacine1@gmail.com',
          to: email,
          subject: 'Réinitialisation de mot de passe',
          html: `
          <p>Bonjour,</p>
          <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
          <p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :</p>
          <a href="${resetPasswordLink}">${resetPasswordLink}</a>
          <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
              return res.status(500).json({ message: 'Error sending email' });
          }
          console.log('Email sent: ' + info.response);
          res.json({ message: 'User registration successful. Confirmation email sent to admin.' });
      });
      res.json({ resetToken }); // Renvoyer le token de réinitialisation temporaire au client
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error resetting password' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    console.log("=>",user.username)
    console.log(newPassword);
    user.password = bcrypt.hashSync(newPassword, 8);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

function generateResetToken() {
  const resetToken = jwt.sign({ data: 'resetToken' }, 'projetPI-secret-key', { expiresIn: '1h' });
  return resetToken;
};

const createUserFromGoogle = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const username = email.split('@')[0];
    const randomPassword = Math.random().toString(36).slice(-8);

    user = new User({
      email,
      username,
      password: randomPassword
    });

    const userRole = await Role.findOne({ name: 'user' });
    if (!userRole) {
      return res.status(500).json({ message: 'User role not found' });
    }
    user.roles = [userRole._id];

    user.statusUser = 'nonConfirmé';

    await user.save(); 
    
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
        <p>http://localhost:9090/api/confirm-user/${user._id}</p>
      `,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('User created successfully. Confirmation email sent to admin: ' + info.response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

const confirmUserByLink = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.statusUser === 'confirmé') {
      return res.status(400).json({ message: 'User already confirmed' });
    }

    user.statusUser = 'confirmé';

    await user.save();
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
    to: user.email,
    subject: 'Account Confirmation',
    html: `
      <p>Hello ${user.username},</p>
      <p>Your account has been confirmed successfully.</p>
      <p>Thank you for registering.</p>
    `,
  };
  
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent: ' + info.response);
} catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Error blocking user' });
}
};

const blockUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.statusCompte === 'bloqué') {
      return res.status(400).json({ message: 'User already blocked' });
    }

    user.statusCompte = 'bloqué';

    await user.save();

    const mailOptions = {
      from: 'Bozyacine1@gmail.com',
      to: user.email,
      subject: 'Account Blocked',
      html: `
        <p>Hello ${user.username},</p>
        <p>Your account has been blocked.</p>
        <p>Please contact the administrator for further information.</p>
      `,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error blocking user' });
  }
};

const unblockUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.statusCompte === 'actif') {
      return res.status(400).json({ message: 'User already unblocked' });
    }

    user.statusCompte = 'actif';

    await user.save();

    const mailOptions = {
      from: 'Bozyacine1@gmail.com',
      to: user.email,
      subject: 'Account Unblocked',
      html: `
        <p>Hello ${user.username},</p>
        <p>Your account has been unblocked.</p>
        <p>You can now access your account.</p>
      `,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
    res.json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error unblocking user' });
  }
};

const getBlockedUserCount = async (req, res) => {
  try {
    const blockedUserCount = await User.countDocuments({ statusCompte: 'bloqué' });
    res.json({ blockedUserCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving blocked user count' });
  }
};

const getUnblockedUserCount = async (req, res) => {
  try {
    const unblockedUserCount = await User.countDocuments({ statusCompte: 'actif' });
    res.json({ unblockedUserCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving unblocked user count' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('username email profile');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while retrieving users." });
  }
};

export {
  findAllUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  createUserFromGoogle,
  confirmUserByLink,
  blockUser,
  unblockUser,
  getBlockedUserCount,
  getUnblockedUserCount,
  getAllUsers
};
