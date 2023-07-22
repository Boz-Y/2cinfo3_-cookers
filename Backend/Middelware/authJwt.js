import jwt from "jsonwebtoken";
import  User  from "../Models/user.js";
import  Role  from "../Models/Role.js";

// const verifyToken = (req, res, next) => {
//   let token = req.session.token;

//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }

//   jwt.verify(token, process.env.jwt_Secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Unauthorized!" });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    const isAdminRole = roles.some(role => role.name === "admin");
    if (isAdminRole) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    const isUserRole = roles.some(role => role.name === "user");
    if (isUserRole) {
      next();
    } else {
      res.status(403).send({ message: "Require user Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  isAdmin,
  isUser,
};
