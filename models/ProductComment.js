const {Model} = require('objection');

class ProductComment extends Model {
  static get tableName() {
    return 'product_comment';
  }
}

ProductComment.relationMappings = {
  products: {
    relation: Model.BelongsToOneRelation,
    modelClass: `${__dirname}/Product`,
    join: {
      from: 'product_comment.product_id',
      to: 'product.id'
    }
  },
  account_comment: {
    relation: Model.HasManyRelation,
    modelClass: `${__dirname}/Account`,
    join: {
      from: 'product_comment.account_id',
      extra: ['account.username'],
      to: 'account.id'
    }
  }
}

module.exports = ProductComment;
