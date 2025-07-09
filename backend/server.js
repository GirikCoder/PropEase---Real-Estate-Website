// Basic Express server setup for PropEase backend

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;

// if (!MONGO_URI) {
//   console.error('❌ MONGO_URI is not set in .env file. Exiting.');
//   process.exit(1);
// }
// if (!JWT_SECRET) {
//   console.error('❌ JWT_SECRET is not set in .env file. Exiting.');
//   process.exit(1);
// }

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://girikai777:gCMIzV5EkHNHH98c@cluster0.4z5eswc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/property'));
app.use('/api/enquiries', require('./routes/enquiry'));

app.get('/', (req, res) => {
  res.send('PropEase backend running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 