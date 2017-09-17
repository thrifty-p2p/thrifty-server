const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../auth/middleware');
const Queries = require('../db/queries');
const Product = require('../models/Product');
const Category = require('../models/Category');

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

router.get('/category/:id', (req, res, next) => {
  Category
    .query()
    .where('id', req.params.id)
    .eager('[products, products.[images, seller]]')
    .then(products => {
      res.json(products);
    });
});

router.post('/new/uid/:id', AuthMiddleware.allowAccess, (req, res, next) => {
  Queries.createNewProduct(req.body)
    .then(product => {
      res.json(product);
    });
});

module.exports = router;
