'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Voucher = app.model.define('Voucher', {//充值记录
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    Vnumber: { type: STRING, unique: true },//流水号
    Money: INTEGER.UNSIGNED, // 金额
    Detail: STRING, // 交易详情
    InvoiceState: STRING(1),//发票状态 C/待开票 R/已开票
    PayTime: BIGINT.UNSIGNED, // 交易时间
    MerchantId: STRING,//商家号
  });

  return Voucher;
};
