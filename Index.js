const express = require('express');
const env = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./db/db')
const userRouter = require('./Router/userRouter');
const adminRouter = require('./Router/adminRouter')


app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);



connectDB();

app.get('/', (req, res) => {
    res.send('WELCOME TO IDEEE BLOG!');
})


app.listen(port, ()=> {
    console.log(`Server is running on port http://localhost:${port}`);
});