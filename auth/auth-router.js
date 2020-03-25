const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model.js');

const jsSecret = require('../database/config/secrets');

router.get('/users', (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json({message: 'users not found'});
    })
})

router.post('/register', (req, res) => {
  // implement registration
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 16);
  newUser.password = hash;

  Users.registerUser(newUser)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;
  console.log(`THIS IS REQ.BODY 1`, req.body)
  Users.userLogin({username})
    .first()
    .then(user => {
      console.log(`THIS IS USER 2`, user)
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`,
                token});
      } else {
        res.status(401).json({message: 'Invalid Credentials'});
      }
    })
    .catch(({ name, message, code, stack }) => {
          res.status(500).json({ name, message, code, stack })
        })
});

function generateToken(user) {
  const payload = {
    subject: user.id, //sub
        username: user.username,
  };
  const secret = jsSecret.jwtSecret
    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router
