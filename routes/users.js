const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//User Model
const User = require('../models/user');

// @route   POST /users
// @desc    Register new User
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (user)
      return res
        .status(400)
        .json({ msg: 'User already exists. Use another email.' });

    const newUser = new User({ name, email, password });

    //Create Salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser
          .save()
          .then(({ name, email, id }) => {
            jwt.sign(
              { id },
              config.get('JWT_SECRET'),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;

                res.json({
                  token,
                  user: {
                    name,
                    email,
                    id,
                  },
                });
              }
            );
          })
          .catch(err => res.status(500).json({ msg: err.message }));
      });
    });
  });
});

module.exports = router;
