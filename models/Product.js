const {Model} = require('objection');

class Product extends Model {
  static get tableName() {
    return 'product';
  }
}

Product.relationMappings = {
  categories: {
    relation: Model.ManyToManyRelation,
    modelClass: __dirname + '/Category',
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
  }
}

module.exports = Product;
