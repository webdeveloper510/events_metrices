// app.js
const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
