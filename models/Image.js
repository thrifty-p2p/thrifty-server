const {Model} = require('objection');

class Image extends Model {
  static get tableName() {
    return 'image';
  }
}

Image.relationMapping ={
  products: {
    relation: Model.BelongsToOneRelation,
    modelClass: `${__dirname}/Product`,
    join: {
      from: 'image.product_id',
      to: 'product.id'
    }
  }
}

module.exports = Image;
