/**
 * @Controller
 */
'use strict';

const Controller = require('egg').Controller;
const Op = require('Sequelize').Op;
const createRule = {
  Money: { type: 'number', required: true },
  OrderNumber: { type: 'string', required: true },
  State: { type: 'string', required: true, max: 1 },
  MerchantId: { type: 'string', required: true },
};
class ControllerFinanceData extends Controller {
  /**
   * @Router get /FinanceBrief
   * @Request query string MerchantId eg: MerchantId
   * @Request query string BriefNumber eg: BriefNumber
   * @Request query string OrderNumber eg: OrderNumber
   * @Request query string State eg: State
   * @Request query string startTime eg: startTime
   * @Request query string endTime eg: endTime
   */
  async index() { // get查询
    const { ctx, service } = this;
    const { query, helper } = ctx;
    const {
      MerchantId,
      BriefNumber,
      OrderNumber,
      State,
      startTime,
      endTime
    } = query
    let queryObj = helper.pickTrueValue({
      MerchantId,
      BriefNumber,
      OrderNumber,
      State,
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
    const result = await service.financeBrief.find(queryObj);
    ctx.body = result;
  }
  /**
   *
   * @Router POST /FinanceBrief
   * @Request body FinanceBrief *body resourceInfo
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
      BriefNumber: 'FB' + helper.MathNum(5) + Date.now(),
      CreatedAt: Date.now()
    })
    const userInfo = await service.financeBrief.create(params);
    ctx.body = userInfo;
  }
}

module.exports = ControllerFinanceData;