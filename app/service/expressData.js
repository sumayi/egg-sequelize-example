/* eslint-disable jsdoc/require-param */
'use strict';
const Service = require('egg').Service;

const errMsg = {
  notObj: 'the type of the param should be object',
  notNo: 'the type of the id should be number',
  isEmpty: 'the param object should not be empty',
  noResult: 'there is no result match ',
};
class ServiceOrder extends Service {
  /**
   * ExpressData find by queryObject
   */
  async find(queryObject = {}) {
    const { ctx } = this;
    const { model, helper } = ctx;
    if (!helper.isJson(queryObject)) {
      return { success: false, error: errMsg.notObj };
    }
    const result = await model.ExpressData.findAll({ limit: 10, where: queryObject, row: true });
    return result ?
      (result.length === 1 ? result[0] : result) : { success: false, error: `${errMsg.noResult}${JSON.stringify(queryObject)}` };
  }
  /**
   * ExpressData find by Primary key
   */
  async findByPk(MerchantId) {
    const { ctx } = this;
    const { model } = ctx;
    console.log(MerchantId)
    const result = await model.ExpressData.findOne({ where: MerchantId });
    return result ? result : { success: false, error: `${errMsg.noResult}${MerchantId}` };
  }

  /**
   * ExpressData create
   */
  async create(obj) {
    const { ctx } = this;
    const { model, helper } = ctx;
    if (!helper.isJson(obj)) {
      return { success: false, error: errMsg.notObj };
    }
    console.log(obj)
    const result = await model.ExpressData.create(obj);
    return result;
  }


  /**
   * ExpressData update
   */
  async update(obj) {
    const { model, helper } = this.ctx;
    if (!helper.isJson(obj)) {
      return { success: false, error: errMsg.notObj };
    }
    if (helper.isEmpty(obj)) {
      return { success: false, error: errMsg.isEmpty };
    }
    const { MerchantId } = obj;
    delete obj.MerchantId;
    console.log(obj, MerchantId)
    const result = await model.ExpressData.update(obj.changData, {
      where: { MerchantId },
    });
    return result;
  }
  /**
   * ExpressData DELETE
   */
  async delete(obj) {
    const { model, helper } = this.ctx;
    if (!helper.isJson(obj)) {
      return { success: false, error: errMsg.notObj };
    }
    if (helper.isEmpty(obj)) {
      return { success: false, error: errMsg.isEmpty };
    }
    const result = await model.ExpressData.destroy({
      where: obj,
    });
    return result;
  }
}

module.exports = ServiceOrder;