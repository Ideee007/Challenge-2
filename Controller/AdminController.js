const express = require('express');
const Admin = require('../Model/adminSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const port = process.env.PORT
const { isAuthenticated, adminOnly } = require('../Middleware/jwt')
const User = require('../Model/UserSchema');
const Blog = require('../Model/BlogSchema');


const adminSignup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email: email});
        
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
            role
        });

        await admin.save();

        return res.status(200).json({ message:" Admin saved successfully:", admin });

    } catch (error) {
        return res.status(500).json({ message: "Error saving admin", error });
    }
}


const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ email: email });
        
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found.' });
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            console.log(!isMatch)
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const payload = {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        const dataInfo = {
            token,
            userId: admin._id,
            name: admin.name,
            role: admin.role
        }
        
        return res.status(200).json({ message: 'Admin logged in successfully.', dataInfo });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:'Error occurred while logging in'})
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findByIdAndDelete(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}

const createBlog = async (req, res) => {
    const { title, content, category } = req.body;
  
    try {
      const blog = new Blog({
        title,
        content,
        category,
      });
      await blog.save();
  
      res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
      res.status(500).json({ message: 'Error creating blog', error });
    }
  };

module.exports = { adminSignup, adminLogin, deleteUser, createBlog }