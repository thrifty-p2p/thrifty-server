const {Model} = require('objection');

class Account extends Model {
  static get tableName() {
    return 'account';
  }
}

Account.relationMappings = {
  products: {
    relation: Model.HasManyRelation,
    modelClass: `${__dirname}/Product`,
    join: {
      from: 'account.id',
      to: 'product.seller_id'
    }
  },
  product_comments: {
    relation: Model.ManyToManyRelation,
    modelClass: `${__dirname}/Product`,
    join: {
      from: 'account.id',
      through: {
        from: 'product_comment.account_id',
        to: 'product_comment.product_id'
      },
      to: 'product.id'
    }
  }
}


module.exports = Account;
