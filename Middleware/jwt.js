const jwt = require('jsonwebtoken');
const Admin =require('../Model/adminSchema')


const isAuthenticated = (req, res, next) => {
    try{
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
if (!decoded) {
    return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'YOU ARE NOT AUTHORIZED' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); 
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

module.exports = { isAuthenticated, adminOnly };