'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const FinanceBrief = app.model.define('FinanceBrief', {//资金流水表单
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    BriefNumber: { type: STRING, unique: true },//资金流动号
    Money: INTEGER.UNSIGNED, // 金额
    OrderNumber: STRING,//订单号
    State: STRING(1), // 业务状态 E入账、R退款
    CreatedAt: BIGINT.UNSIGNED,//业务时间
    MerchantId: STRING,//商家号
  });

  return FinanceBrief;
};
