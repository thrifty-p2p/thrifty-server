const knex = require('./knex');

module.exports = {
  getAccountById: id => {
    return knex.select('*').from('account').where('account.id', id)
      .join('product', 'account.id', 'seller_id')
      .join('product_category', 'product.id', 'product_id')
      .join('category', 'category_id', 'category.id')
      // .join('image', 'product.id', 'product_id')
  },
  getAllProducts: () => {
    return knex.select('*').from('product')
      .join('image', 'product.id', 'product_id')
      // .select('*')
      // .join('product_category', 'product.id', 'product_id')
      // .join('category', 'category_id', 'category.id')
  }
};
