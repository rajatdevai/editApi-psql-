require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const editRoutes = require('./routes/editRoutes');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', editRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
