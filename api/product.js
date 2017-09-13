const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

function isIdValid(req, res, next) {
  return !isNaN(req.params.id) ? next() : next(new Error("Invalid Id"));
}

router.get('/', (req, res, next) => {
  queries.getAllProducts()
    .then(product => {
      res.json(product);
    }
  );
});

module.exports = router;
