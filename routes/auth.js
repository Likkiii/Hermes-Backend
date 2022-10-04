const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('Auth route');
});

router.get('/all', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const data = await User.findOne({ username });

    if (data) {
      return res.json({ error: 'User already exists' });
    }

    const user = await User.create({
      username,
      password,
      email,
    });

    if (user) {
      res.json(user);
    } else {
      res.json({ error: 'Error creating user' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
      password,
    });

    if (user) {
      const token = jwt.sign(
        { user: user.username, email: user.email },
        process.env.JWT
      );
      res.json({ user, token });
    } else {
      res.json({ error: 'Error finding user' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/user', async (req, res) => {
  try {
    const usertoken = req.query.token;
    const decoded = jwt.verify(usertoken, process.env.JWT);
    res.json(decoded);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
