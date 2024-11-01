const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true
     },
    email: {
         type: String,
          required: true,
           unique: true 
        },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String,
        enum: ["user", "admin" ], 
        default: "admin"
        },

    resetToken: { type: String},

    resetTokenExpiration:{
        type: Date
    }
    },
{
    timestamps: true ,
    versionKey: false  
});

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin;