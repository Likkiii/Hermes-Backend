const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
require('./models/init');

const authRoute = require('./routes/auth');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/auth', authRoute);

app.get('*', (req, res) => {
  res.send('error 404');
});

PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
