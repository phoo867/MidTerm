const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const creaturesRouter = require('./models/routes/creatures'); // adjust the path as needed

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mythicalCreaturesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Use creatures router for API
app.use('/creatures', creaturesRouter);

// Define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Mythical Creatures API.' });
});

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});


// Error handling middleware for other errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
