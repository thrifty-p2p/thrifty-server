const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const queries = require('../db/queries');

function isIdValid(req, res, next) {
  return !isNaN(req.params.id)
    ? next()
    : next(new Error("Invalid Id"));
}
router.get('/:id', (req, res, next) => {
  queries.getUserById(req.params.id).then(account => {
    console.log(account);
  });
});

module.exports = router;
