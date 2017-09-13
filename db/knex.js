const { Model } = require('objection');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const environmentConfig = config[environment];
const knex = require('knex');
const connection = knex(environmentConfig);

Model.knex(connection);

module.exports = connection;
