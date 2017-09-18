const {Model} = require('objection');

class AccountAddress extends Model {
  static get tableName() {
    return 'account_address';
  }
}

AccountAddress.relationMappings = {
  account: {
    relation: Model.BelongsToOneRelation,
    modelClass: `${__dirname}/Account`,
    join: {
      from: 'address_account.account_id',
      to: 'account.id',
    }
  },
  location: {
    relation: Model.BelongsToOneRelation,
    modelClass: `${__dirname}/Location`,
    join: {
      from: 'account_address.location_id',
      to: 'location.id'
    }
  }
}
