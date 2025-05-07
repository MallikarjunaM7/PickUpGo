require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require('./utils/db.js');
const authRouter = require('./router/authRouter.js');
const adminRouter = require('./router/adminRoute.js');
const homeRouter = require('./router/homeRouter.js');

// ✅ CORS should be the first middleware
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

// ✅ Now other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ✅ Now define routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/home", homeRouter);

// ✅ Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
