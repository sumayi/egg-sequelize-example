'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Finance = app.model.define('Finance', {//提现表单
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    ApplyNumber: { type: STRING, unique: true },//提现单号
    Money: INTEGER.UNSIGNED, // 金额
    State: STRING(1), // 状态 C/待审核 R/已审核
    PayState: STRING(1),//支付状态 C/待支付 R/已支付
    Type: STRING(1), //  付款方式 O/线上支付 F/线下支付
    ApplyType: STRING(1),//提现类型 W/微信 A/支付宝
    Idea: STRING,// 审核意见
    Auditor: STRING, //审核人
    ApplyTime: BIGINT.UNSIGNED, //申请时间
    PayTime: BIGINT.UNSIGNED, // 支付时间
    MerchantId: STRING,//商家号
  });

  return Finance;
};
