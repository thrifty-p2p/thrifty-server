const knex = require('./knex');

module.exports = {
  getProfileById: (id) => {
    return knex('account_address').where('account_id', id)
      .join('location', 'location.id', 'account_address.location_id')
      .join('account', 'account_address.account_id', 'account.id')
  },
  createNewProduct: (product) => {
    const {
      title,
      price,
      description,
      color,
      seller_id,
      image_url
    } = product;
    return knex('product').insert({
      title,
      price,
      description,
      color,
      seller_id,
    }, '*').then(result => {
      const createdProduct = result[0];
      const product_id = createdProduct.id;
      return knex('category')
        .whereIn('name', product.category_names)
        .pluck('id')
        .then(categoryIDs => {
          const product_category = categoryIDs.map(category_id => {
            return {
              product_id,
              category_id
            }
          });
          return knex('product_category')
          .insert(product_category)
          .then(() => {
            return knex('image').insert({
              product_id,
              image_url
            }).then(() => {
              createdProduct.category_names = product.category_names;
              createdProduct.image_url = product.image_url;
              return createdProduct;
            });
          });
        });
    });
  },

  updateProductAvailablity: (id) => {
    return knex('product').where('id', id)
      .update({'is_available': false}, '*')
  },

  createOrder: (order) => {
    const {product_id, buyer_id, transaction_id, seller_id} = order;
    return knex('store_order').insert({
      product_id,
      buyer_id,
      transaction_id,
    }, 'id')
    .then(id => {
      return knex('store_order').where('id', id[0])
        .update({is_complete: true})
        .then(result => {
          return knex('account').where('id', seller_id).first()
          .then(user => {
            user.total_sales += 1;
            return knex('account').update({
              total_sales: user.total_sales
            });
          });
        });
    });
  }
};
