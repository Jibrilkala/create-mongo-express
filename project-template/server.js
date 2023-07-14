const https = require('https');
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cluster = require('cluster');
const os = require('os');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3500;
const axios = require('axios');
const fs = require('fs');

// Connect to MongoDB
mongoose.set('strictQuery', false);
connectDB();

// Custom middleware
app.use(logger);

// Handles options credentials: Check before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: '*',
  })
);

// Built-in middleware for parsing form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for parsing JSON data
app.use(express.json());

// Built-in middleware for parsing cookies
app.use(cookieParser());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/api/register', require('./routes/api/register'));
app.use('/api/auth', require('./routes/api/auth'));

// Protected routes
app.use(verifyJWT);

// Route handlers
app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
