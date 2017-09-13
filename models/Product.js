const {Model} = require('objection');

class Product extends Model {
  static get tableName() {
    return 'product';
  }
}

Product.relationMappings = {
  categories: {
    relation: Model.ManyToManyRelation,
    modelClass: `${__dirname}/Category`,
    join: {
      from: 'product.id',
      through: {
        from: 'product_category.product_id',
        to: 'product_category.category_id'
      },
      to: 'category.id'
    }
  },
  images: {
    relation: Model.HasManyRelation,
    modelClass: `${__dirname}/Image`,
    join: {
      from: 'product.id',
      to: 'image.product_id'
    }
  },
  seller: {
    relation: Model.HasOneRelation,
    modelClass: `${__dirname}/Account`,
    join: {
      from: 'product.seller_id',
      to: 'account.id'
    }
  },
  product_comments: {
    relation: Model.ManyToManyRelation,
    modelClass: `${__dirname}/Account`,
    filter: query => query.select('account.id', 'username', 'first_name'),
    join: {
      from: 'product.id',
      through: {
        from: 'product_comment.product_id',
        extra: ['comment', 'created_at'],
        to: 'product_comment.account_id'
      },
      to: 'account.id'
    }
  }
}

module.exports = Product;
