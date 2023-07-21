// auth.middleware.js
export const isAdmin = (req, res, next) => {
  // Vérifier si l'utilisateur est authentifié et a le rôle d'administrateur
  if (req.user && (req.user.role === 'admin' || req.user.role === 'user')) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};
