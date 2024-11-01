const express = require('express');
const { userSignup, Login, getStarredBlogs, deleteAllStarredBlogs } = require('../Controller/UserController');
const router = express.Router();
const { isAuthenticated } = require('../Middleware/jwt')


router.post('/register', userSignup)
router.post('/login', Login)
router.get('/starredBlogs', isAuthenticated, getStarredBlogs);
router.delete('/starredBlogs', isAuthenticated, deleteAllStarredBlogs);

module.exports = router;