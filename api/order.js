const express = require('express');
const router = express.Router();
const Queries = require('../db/queries');

function isIdValid(req, res, next) {
  return !isNaN(req.params.id) ? next() : next(new Error("Invalid Id"));
}

router.post('/', (req, res) => {
  Queries.createOrder(req.body)
    .then(order => {
      res.json(order)
    })
});



module.exports = router;
