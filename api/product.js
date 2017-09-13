const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

const Product = require('../models/Product');

router.get('/', (req, res, next) => {
  Product
    .query()
    .eager('categories', 'images')
    .then(products => {
      res.json(products);
    }
  );
});



module.exports = router;
