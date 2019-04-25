/**
 * @Controller
 */
'use strict';

const Controller = require('egg').Controller;
const Op = require('Sequelize').Op;
const createRule = {
  Money: { type: 'number', required: true },
  Detail: { type: 'string', required: true },
  MerchantId: { type: 'string', required: true }
};
class ControllerFinanceData extends Controller {
  /**
   * @Router get /Voucher
   * @Request query string MerchantId eg: MerchantId
   * @Request query string Vnumber eg: Vnumber
   * @Request query string InvoiceState eg: InvoiceState
   * @Request query string State eg: State
   * @Request query string startTime eg: startTime
   * @Request query string endTime eg: endTime
   */
  async index() { // get查询
    const { ctx, service } = this;
    const { query, helper } = ctx;
    const {
      MerchantId,
      Vnumber,
      InvoiceState,
      startTime,
      endTime
    } = query
    let queryObj = helper.pickTrueValue({
      MerchantId,
      Vnumber,
      InvoiceState,
    });
    if (startTime && endTime) {
      queryObj = Object.assign(queryObj, {
        CreatedAt: {
          [Op.gt]: startTime,
          [Op.lt]: endTime,
        },
      });
    }
    if (!MerchantId) {
      ctx.body = 'no MerchantId';
      return false;
    }
    console.log(queryObj)
    const result = await service.voucher.find(queryObj);
    ctx.body = result;
  }
  /**
   *
   * @Router POST /Voucher
   * @Request body Voucher *body resourceInfo
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
    params = Object.assign(params, {
      Vnumber: 'OR' + helper.MathNum(5) + Date.now(),
      InvoiceState: 'C',
      PayTime: Date.now()
    })
    console.log(params)
    const userInfo = await service.voucher.create(params);
    ctx.body = userInfo;
  }
  /**
   * @Router put /Voucher/{id}
   * @Request path string *id eg:1 id
   * @Request body Voucher
   */
  async update() { // put
    const { ctx, service } = this;
    const changData = ctx.request.body;
    const Vnumber = ctx.params.id;
    const userInfo = await service.voucher.update({ Vnumber, changData });
    ctx.body = userInfo;
  }
}

module.exports = ControllerFinanceData;