require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./utils/db.js')
const authRouter = require('./router/authRouter.js')
const adminRouter = require('./router/adminRoute.js')


// Middleware setup
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)

const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true,
}
app.use(cors(corsOptions))
// MongoDB connection setup


connectDB().then(() => {  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}
)


