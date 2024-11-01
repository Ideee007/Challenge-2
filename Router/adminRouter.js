const express = require('express');
const { adminSignup, adminLogin, deleteUser, createBlog } = require('../Controller/AdminController');
const router = express.Router();
const { isAuthenticated, adminOnly } = require('../Middleware/jwt')


router.post('/register', adminSignup)
router.post('/login', adminLogin)
router.patch('/deleteUser/:id', isAuthenticated, adminOnly, deleteUser);
router.post('/createBlog', isAuthenticated, adminOnly, createBlog);

module.exports = router;