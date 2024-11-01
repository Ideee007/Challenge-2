const User = require('../Model/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const port = process.env.PORT
const Blog = require('../Model/BlogSchema');

const userSignup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email: email});
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        return res.status(200).json({ message:" User saved successfully:", user });

    } catch (error) {
        return res.status(500).json({ message: "Error saving user", error });
    }
}


const Login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
        }
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        const dataInfo = {
            token,
            userId: user._id,
            name: user.name,
            role: user.role
        }
        
        return res.status(200).json({ message: 'User logged in successfully.', dataInfo });
    } catch (error) {
        return res.status(500).json({ message:'Error occurred while logging in'})
    }
}

const getStarredBlogs = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('starredBlogs');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ starredBlogs: user.starredBlogs });
      console.log("Decoded User:", req.user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving starred blogs", error });
    }
  };
  
 
  const deleteAllStarredBlogs = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, { starredBlogs: [] }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "All starred blogs deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting starred blogs", error });
    }
  };



module.exports = {userSignup, Login, getStarredBlogs, deleteAllStarredBlogs };