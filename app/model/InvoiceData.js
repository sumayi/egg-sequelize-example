'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const InvoiceData = app.model.define('InvoiceData', {//发票信息
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    MerchantId: STRING,//商家号
    State: STRING, // 发票类型 N/增值税普通发票 E/增值税专用发票
    Name: STRING,//发票抬头名称
    TaxNumber: STRING,//税号
    ComAddress: STRING,//公司地址
    Money: INTEGER.UNSIGNED,//发票金额
    Phone: STRING,
    Bank: STRING,//开户银行
    BankNum: STRING,//银行账户
  });

  return InvoiceData;
};
