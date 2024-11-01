const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log("error connecting to MongoDB");
        
    }
}


module.exports = connectDB;