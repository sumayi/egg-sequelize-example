/**
 * @Controller
 */
'use strict';

const Controller = require('egg').Controller;
const Op = require('Sequelize').Op;
const createRule = {
  MerchantId: { type: 'string', required: true, example: 's1234' },
  User: { type: 'string', required: true, example: 'Nsd' },
  Phone: { type: 'string', required: true, example: 's1234' },
  ExpCity: { type: 'string', required: true, example: 's1234' },
  ExpAddress: { type: 'string', required: true, example: '1234' },
};
class ControllerFinanceData extends Controller {
  /**
   * @Router get /ExpressData
   * @Request query string MerchantId eg: MerchantId
   */
  async index() { // get查询
    const { ctx, service } = this;
    const { query, helper } = ctx;
    const {
      MerchantId
    } = query
    let queryObj = helper.pickTrueValue({
      MerchantId
    });
    if (!MerchantId) {
      ctx.body = 'no MerchantId';
      return false;
    }
    console.log(queryObj)
    const result = await service.expressData.find(queryObj);
    ctx.body = result;
  }
  /**
   *
   * @Router POST /ExpressData
   * @Request body ExpressData *body resourceInfo
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
    const userInfo = await service.expressData.create(params);
    ctx.body = userInfo;
  }
  /**
   * @Router put /ExpressData/{id}
   * @Request path string *id eg:1 id
   * @Request body ExpressData
   */
  async update() { // put=》真id索引修改
    const { ctx, service } = this;
    const changData = ctx.request.body;
    const MerchantId = ctx.params.id;
    console.log(changData, MerchantId);
    const userInfo = await service.expressData.update({ MerchantId, changData });
    ctx.body = userInfo;
  }
}

module.exports = ControllerFinanceData;