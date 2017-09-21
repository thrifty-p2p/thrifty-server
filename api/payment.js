const express = require('express');
const router = express.Router();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY
const stripe = require('stripe')(stripeSecretKey);

router.post('/', (req, res) => {
  const amount = req.body.amount * 100;
  stripe.customers.create({
    email: req.body.email,
    card: req.body.tokenId
  })
  .then(customer => {
    stripe.charges.create({
      amount,
      description: req.body.description,
      currency: "usd",
      customer: customer.id
    });
  })
  .then(charge => {
    res.send(charge);
  })
  .catch(error => {
    console.log('Error: ', error);
    res.status(500).send({error: "Purchase Failed"})
  })
});

module.exports = router;
