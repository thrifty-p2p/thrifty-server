const knex = require('./knex');

module.exports = {
  getUserByEmail: email => {
    return knex('account').where('email', email).first();
  },
  createNewAccount: account => {
    return knex('account').insert(account, 'id').then(Account => {
      return Account[0];
    });
  }
};
