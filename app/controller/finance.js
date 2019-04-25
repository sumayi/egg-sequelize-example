// /**
//  * @Controller
//  */
'use strict';

const Controller = require('egg').Controller;
const Op = require('Sequelize').Op;
const createRule = {
  Money: { type: 'number', required: true, example: 1234 },
  ApplyType: { type: 'string', required: true, example: 'W' },
  Type: { type: 'string', required: true, example: 'O' },
  MerchantId: { type: 'string', required: true, example: 's1234' },
};
class ControllerFinanceData extends Controller {
  /**
   * @Router get /Finance
   * @Request query string MerchantId eg: MerchantId
   * @Request query string ApplyNumber eg: ApplyNumber
   * @Request query string PayState eg: PayState
   * @Request query string State eg: State
   * @Request query string Type eg: Type
   * @Request query string startTime eg: startTime
   * @Request query string endTime eg: endTime
   * @Request query string ApplyType eg: ApplyType
   */
  async index() { // get查询
    const { ctx, service } = this;
    const { query, helper } = ctx;
    const {
      MerchantId,
      ApplyType,
      ApplyNumber,
      PayState,
      Type,
      State,
      startTime,
      endTime
    } = query
    let queryObj = helper.pickTrueValue({
      MerchantId,
      ApplyType,
      ApplyNumber,
      PayState,
      Type,
      State,
    });
    console.log(startTime)
    if (startTime && endTime) {
      queryObj = Object.assign(queryObj, {
        ApplyTime: {
          [Op.gt]: startTime,
          [Op.lt]: endTime,
        },
      });
    }
    if (!MerchantId || !ApplyType) {
      ctx.body = 'no MerchantId';
      return false;
    }
    console.log(queryObj)
    const result = await service.finance.find(queryObj);
    ctx.body = result;
  }
  /**
   *
   * @Router POST /Finance
   * @Request body Finance *body resourceInfo
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
      ApplyNumber: 'F' + helper.MathNum(5) + Date.now(),
      ApplyTime: Date.now(),
      State: 'C',
      PayState: 'C',
    })
    const userInfo = await service.finance.create(params);
    ctx.body = userInfo;
  }
  /**
   * @Router put /Finance/{id}
   * @Request path string *id eg:1 id
   * @Request body Finance
   */
  async update() { // put
    const { ctx, service } = this;
    const changData = ctx.request.body;
    const ApplyNumber = ctx.params.id;
    console.log(changData, ApplyNumber);
    const userInfo = await service.finance.update({ ApplyNumber, changData });
    ctx.body = userInfo;
  }
}

module.exports = ControllerFinanceData;