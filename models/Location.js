const {Model} = require('objection');

class Location extends Model {
  static get tableName() {
    return 'account_address';
  }
}

Location.relationMappings = {
  account_address: {
    relation: Model.HasManyRelation,
    modelClass: `${__dirname}/AccountAddress`,
    join: {
      from: 'location.id',
      to: 'account_address.location_id',
    }
  }
}
