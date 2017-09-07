const knex = require('./knex');

module.exports = {
  getUserById: id => {
    return knex.select('*').from('account').where('account.id', id)
      // .join('location', 'location.id', 'location_id');
  }
};
