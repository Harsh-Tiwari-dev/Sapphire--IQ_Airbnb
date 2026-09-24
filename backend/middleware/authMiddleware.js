const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Authentication required! Please login first.",
      });
    }

    
    if (requiredRole && req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied! Only ${requiredRole}s are allowed to perform this action.`,
      });
    }
    next();
  };
};

export default authMiddleware;