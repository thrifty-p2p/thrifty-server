const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const USER = require('../db/authentication');
const VALIDATION = require('../utilities');

router.get('/', (req, res) => {
  res.json({
    message: "Authentication Endpoint Working"
  });
});

router.post('/signup', (req, res, next) => {
  if(VALIDATION.isUserValid(req.body)) {
    USER.getUserByEmail(req.body.email)
      .then(user => {
        console.log("User: ", user)
        if(!user) {
          bcrypt.hash(req.body.password, 10)
            .then(hash => {
              const account = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                username: req.body.username,
                password: hash,
                // profile_image_url: req.body.profile_image_url
                // total_sales: 0,
                // total_purchases: 0,
                // date_created: new Date(),
                // admin: false
              };
              USER.createNewAccount(account)
                .then(id => {
                  jwt.sign({
                    id,
                  }, process.env.TOKEN_SECRET, {
                    expiresIn: '7d'
                  }, (err, token) => {
                    console.log('err ', err);
                    console.log('token', token);
                    res.json({
                      id,
                      email: account.email,
                      token,
                      message: "New Account Created"
                    });
                  });
                });
            });
        } else {
          next(new Error("Email is already in use"));
        }
      });
  } else {
    next(new Error("Invalid User"));
  }
});

module.exports = router;
