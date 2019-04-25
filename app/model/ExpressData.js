'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const ExpressData = app.model.define('ExpressData', {//快递地址信息
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    MerchantId: STRING,//商家号
    User: STRING,//收货人
    Phone: STRING,//收货人电话
    ExpCity: STRING,//省市区
    ExpAddress: STRING,//详细地址
  });

  return ExpressData;
};
