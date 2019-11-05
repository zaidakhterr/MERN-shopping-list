const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//User Model
const User = require('../models/user');

//Auth middleware
const auth = require('../middleware/auth');

// @route   POST /auth
// @desc    Register new User
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  //Validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist.' });

    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ msg: 'Invalid credentials.' });

      jwt.sign(
        { id: user.id },
        config.get('JWT_SECRET'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              name: user.name,
              email: user.email,
              id: user.id,
            },
          });
        }
      );
    });
  });
});

// @route   GET /auth/user
// @desc    GET user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
