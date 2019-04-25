/**
 * @Controller
 */
'use strict';

const Controller = require('egg').Controller;
const Op = require('Sequelize').Op;
const createRule = {
  MerchantId: { type: 'string', required: true, example: 's1234' },
  State: { type: 'string', required: true, example: 'N' },
  Name: { type: 'string', required: true, example: 'ASDF' },
  TaxNumber: { type: 'string', required: true, example: 's1234' },
  ComAddress: { type: 'string', required: true, example: 's1234' },
  Money: { type: 'number', required: true, example: 1234 },
  Phone: { type: 'string', required: true, example: 's1234' },
  Bank: { type: 'string', required: true, example: 's1234' },
  BankNum: { type: 'string', required: true, example: 's1234' },
};
class ControllerFinanceData extends Controller {
  /**
   * @Router get /InvoiceData
   * @Request query string MerchantId eg: MerchantId
   * @Request query string State eg: State
   */
  async index() { // get查询
    const { ctx, service } = this;
    const { query, helper } = ctx;
    const {
      MerchantId,
      State
    } = query
    let queryObj = helper.pickTrueValue({
      MerchantId,
      State
    });
    if (!MerchantId || !State) {
      ctx.body = 'no MerchantId';
      return false;
    }
    console.log(queryObj)
    const result = await service.invoiceData.find(queryObj);
    ctx.body = result;
  }
  /**
   *
   * @Router POST /InvoiceData
   * @Request body InvoiceData *body resourceInfo
   * @Request header string access_token
   * @Response 200 baseResponse
   */
  async create() { // post
    const { ctx, service } = this;
    const { helper } = ctx;
    // ctx.validate(createRule);
    let params = ctx.request.body;
    try { //验证参数正确
      ctx.validate(createRule, params);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = { success: false, errors: err };
      return;
    }
    const userInfo = await service.invoiceData.create(params);
    ctx.body = userInfo;
  }
  /**
   * @Router put /InvoiceData/{id}
   * @Request path string *id eg:1 id
   * @Request body InvoiceData
   */
  async update() { // put=》真id索引修改
    const { ctx, service } = this;
    const changData = ctx.request.body;
    const id = ctx.params.id;
    console.log(changData, id);
    const userInfo = await service.invoiceData.update({ id, changData });
    ctx.body = userInfo;
  }
}

module.exports = ControllerFinanceData;