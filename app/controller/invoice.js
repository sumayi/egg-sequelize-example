/**
 * @Controller
 */
'use strict';

const Controller = require('egg').Controller;
const Op = require('Sequelize').Op;
const createRule = {
  MerchantId: { type: 'string', required: true, example: 's1234' },
  Vstate: { type: 'string', required: true, example: 'W' },
  Money: { type: 'number', required: true, example: 1234 }
};
class ControllerFinanceData extends Controller {
  /**
   * @Router get /Invoice
   * @Request query string MerchantId eg: MerchantId
   * @Request query string Vstate eg: Vstate
   * @Request query string state eg: state
   * @Request query string startTime eg: startTime
   * @Request query string endTime eg: endTime
   */
  async index() { // get查询
    const { ctx, service } = this;
    const { query, helper } = ctx;
    const {
      MerchantId,
      Vstate,
      state,
      startTime,
      endTime
    } = query
    let queryObj = helper.pickTrueValue({
      MerchantId,
      Vstate,
      state
    });
    console.log(startTime)
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
    const result = await service.invoice.find(queryObj);
    ctx.body = result;
  }
  /**
   *
   * @Router POST /Invoice
   * @Request body Invoice *body resourceInfo
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
      State: 'C',
      CreatedAt: Date.now()
    })
    const userInfo = await service.invoice.create(params);
    ctx.body = userInfo;
  }
  /**
   * @Router put /Invoice/{id}
   * @Request path string *id eg:1 id
   * @Request body Invoice
   */
  async update() { // put
    const { ctx, service } = this;
    const changData = ctx.request.body;
    const id = ctx.params.id;
    console.log(changData, id);
    const userInfo = await service.invoice.update({ id, changData });
    ctx.body = userInfo;
  }
}

module.exports = ControllerFinanceData;