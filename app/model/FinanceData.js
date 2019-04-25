'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const FinanceData = app.model.define('FinanceData', {//提现资料
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    license: STRING,//营业执照
    Applytype: STRING, // 提现方式
    IDcardFront: STRING,//法人身份证正
    IDcardReverse: STRING, // 法人身份证反
    Phone: STRING,//电话
    Bank: STRING,//开户银行
    BranchBank: STRING,//开户支行
    BankNum: STRING,//银行账号
    MerchantId: STRING,//商家号
  });

  return FinanceData;
};
