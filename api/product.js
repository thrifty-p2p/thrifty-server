const express = require('express');
const router = express.Router();
<<<<<<< HEAD

const queries = require('../db/queries');

function isIdValid(req, res, next) {
  return !isNaN(req.params.id) ? next() : next(new Error("Invalid Id"));
}

router.get('/', (req, res, next) => {
  queries.getAllProducts()
    .then(product => {
      res.json(product);
=======
const queries = require('../db/queries');

const Product = require('../models/Product');

router.get('/', (req, res, next) => {
  Product
    .query()
    .eager('[categories, images, seller, product_comments]')
    .then(products => {
      res.json(products);
>>>>>>> ObectionJS
    }
  );
});

<<<<<<< HEAD
=======


>>>>>>> ObectionJS
module.exports = router;
