const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const cors = require('cors');  // Include this if you are working with frontend

dotenv.config();  // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors());  // Allow CORS if frontend and backend are on different domains

// Routes
app.use('/api/user', userRoutes);

// Optional: If you have other routes (e.g., file upload, etc.)
app.use('/api/files', require('./routes/files'));

// Catch-all route for invalid endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found" });
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
