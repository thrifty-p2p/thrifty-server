const {Model} = require('objection');

class Account extends Model {
  static get tableName() {
    return 'account';
  }
}

Account.relationMappings = {
  products: {
    relation: Model.HasManyRelation,
    modelClass: __dirname + '/Product',
    join: {
      from: 'account.id',
      to: 'product.seller_id'
    }
  }
}


module.exports = Account;
