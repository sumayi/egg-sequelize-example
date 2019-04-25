/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // config request api
  config.api = {
    baseUrl: 'http://localhost:7001',
    online: '',
    pay: '',
    merchant: '',
    goods: '',
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554706169604_8054';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // change to your own sequelize configurations
  config.sequelize = {
    username: 'root',
    password: '654321',
    database: 'FinanceService',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      charset: 'utf8mb4',
      freezeTableName: true,
      collate: 'utf8_general_ci',
      timestamps: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
