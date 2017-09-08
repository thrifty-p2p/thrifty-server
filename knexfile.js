const dotenv = require('dotenv');
dotenv.config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/trifty'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
