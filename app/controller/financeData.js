/**
 * @Controller
 */
'use strict';

const Controller = require('egg').Controller;
const Op = require('Sequelize').Op;
const createRule = {
  license: { type: 'string', required: true },
  Applytype: { type: 'string', required: true },
  IDcardFront: { type: 'string', required: true },
  IDcardReverse: { type: 'string', required: true },
  Phone: { type: 'string', required: true },
  Bank: { type: 'string', required: true },
  BranchBank: { type: 'string', required: true },
  BankNum: { type: 'string', required: true },
  MerchantId: { type: 'string', required: true },
};
class ControllerFinanceData extends Controller {
  /**
   * @Router get /FinanceData
   * @Request path string *id eg:1 id
   */
  async show() { // get查询
    const { ctx, service } = this;
    const MerchantId = ctx.params.id;
    const result = await service.financeData.findByPk({ MerchantId });
    ctx.body = result;
  }
  /**
   *
   * @Router POST /FinanceData
   * @Request body FinanceData *body resourceInfo
   * @Request header string access_token
   * @Response 200 baseResponse
   */
  async create() { // post创建公共商品
    const { ctx, service } = this;
    const { helper } = ctx;
    const params = ctx.request.body;
    try {
      ctx.validate(createRule, params);
    } catch (err) {
      ctx.logger.warn(err.errors);
      console.log(err);
      ctx.body = { success: false, errors: err };
      return;
    }
    const { license, Applytype, IDcardFront, IDcardReverse, Phone, Bank, BranchBank, BankNum, MerchantId } = params;
    let queryObj = helper.pickTrueValue({ license, Applytype, IDcardFront, IDcardReverse, Phone, Bank, BranchBank, BankNum, MerchantId });
    const userInfo = await service.financeData.create(queryObj);
    ctx.body = userInfo;
  }
  /**
   * @Router put /FinanceData/{id}
   * @Request path string *id eg:1 id
   * @Request body FinanceData
   */
  async update() { // put
    const { ctx, service } = this;
    const changData = ctx.request.body;
    const MerchantId = ctx.params.id;
    console.log(changData);
    const userInfo = await service.financeData.update({ MerchantId, changData });
    ctx.body = userInfo;
  }
  /**
   * @Router delete /FinanceData/{id}
   * @Request path string *id eg:1 id
   * @Request body FinanceData
   */
  async destroy() { // DELETE
    const { ctx, service } = this;
    const MerchantId = ctx.params.id;
    const userInfo = await service.financeData.delete({ MerchantId });
    ctx.body = userInfo;
  }
}

module.exports = ControllerFinanceData;