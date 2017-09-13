const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const Product = require('../models/Product');

router.get('/', (req, res, next) => {
  Product
    .query()
    .eager('[categories, images, seller, product_comments]')
    .then(products => {
      res.json(products);
    });
});

router.get('/:id', (req, res, next) => {
  Product
    .query()
    .where('id', req.params.id)
    .eager('[categories, images, seller, product_comments]')
    .then(products => {
      res.json(products);
    });
});

module.exports = router;
