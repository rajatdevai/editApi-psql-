require('dotenv').config();
module.exports = {
    development: {
      username: 'postgres',
      password: 'London@123',
      database: 'settingAPI',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
    production: {
      use_env_variable:'postgres:London@123@localhost:5432/settingAPI'
      ,
    },
  };
  