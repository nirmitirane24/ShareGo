require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.error('Connection failed:', err.message);
    });
}

module.exports = connectDB;

