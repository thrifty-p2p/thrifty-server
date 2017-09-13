const {Model} = require('objection');

class Category extends Model {
  static get tableName() {
    return 'category';
  }
}

Category.relationMappings = {
  products: {
    relation: Model.ManyToManyRelation,
    modelClass: `${__dirname}/Product`,
    join: {
      from: 'category.id',
      through: {
        from: 'product_category.category_id',
        to: 'product_category.product_id'
      },
      to: 'product.id'
    }
  }
}

module.exports = Category;
