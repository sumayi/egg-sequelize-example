'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Invoice = app.model.define('Invoice', {//发票信息
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    MerchantId: STRING,//商家号
    Vstate: STRING, // 发票类型 N/增值税普通发票 E/增值税专用发票
    Money: INTEGER.UNSIGNED,//发票金额
    State: STRING,//发票审核状态 C/待审核 R/已审核
    Express: STRING,//快递信息
    CreatedAt: BIGINT.UNSIGNED,//申请时间
  });

  return Invoice;
};
