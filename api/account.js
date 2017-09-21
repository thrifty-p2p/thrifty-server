const express = require('express');
const router = express.Router();
const Queries = require('../db/queries');
const Account = require('../models/Account');

function isIdValid(req, res, next) {
  return !isNaN(req.params.id) ? next() : next(new Error("Invalid Id"));
}

router.get('/profile/:id', (req, res) => {
  Queries.getProfileById(req.params.id)
    .then(profile => {
      res.json(profile);
    });
});

router.get('/:id', (req, res, next) => {
  Account
    .query()
    .where('id', req.params.id)
    .eager('[products, products.[images, seller, categories, product_comments]]')
    .then(products => {
      res.json(products);
    });
});

router.get('/', (req, res, next) => {
  Account
    .query()
    .eager('[products]')
    .then(products => {
      res.json(products);
    });
});




module.exports = router;
