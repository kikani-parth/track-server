require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  'mongodb+srv://admin:admin@tracker-cluster.pie0m.mongodb.net/?retryWrites=true&w=majority&appName=tracker-cluster';

const PORT = 3000;

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', () => {
  console.error('Error connecting to mongo', error);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Email: ${req.user.email}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
