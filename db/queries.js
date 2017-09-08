const knex = require('./knex');

module.exports = {
  getUserById: id => {
    return knex.select('*').from('account').where('account.id', id);a
  }
};
