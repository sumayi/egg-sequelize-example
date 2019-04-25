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
   * Invoice find by queryObject
   */
  async find(queryObject = {}) {
    const { ctx } = this;
    const { model, helper } = ctx;
    if (!helper.isJson(queryObject)) {
      return { success: false, error: errMsg.notObj };
    }
    const result = await model.Invoice.findAll({ limit: 10, where: queryObject, row: true });
    return result ?
      (result.length === 1 ? result[0] : result) : { success: false, error: `${errMsg.noResult}${JSON.stringify(queryObject)}` };
  }
  /**
   * Invoice find by Primary key
   */
  async findByPk(MerchantId) {
    const { ctx } = this;
    const { model } = ctx;
    console.log(MerchantId)
    const result = await model.Invoice.findOne({ where: MerchantId });
    return result ? result : { success: false, error: `${errMsg.noResult}${MerchantId}` };
  }

  /**
   * Invoice create
   */
  async create(obj) {
    const { ctx } = this;
    const { model, helper } = ctx;
    if (!helper.isJson(obj)) {
      return { success: false, error: errMsg.notObj };
    }
    console.log(obj)
    const result = await model.Invoice.create(obj);
    return result;
  }


  /**
   * Invoice update
   */
  async update(obj) {
    const { model, helper } = this.ctx;
    if (!helper.isJson(obj)) {
      return { success: false, error: errMsg.notObj };
    }
    if (helper.isEmpty(obj)) {
      return { success: false, error: errMsg.isEmpty };
    }
    const { id } = obj;
    delete obj.id;
    const result = await model.Invoice.update(obj.changData, {
      where: { id },
    });
    return result;
  }
  /**
   * Invoice DELETE
   */
  async delete(obj) {
    const { model, helper } = this.ctx;
    if (!helper.isJson(obj)) {
      return { success: false, error: errMsg.notObj };
    }
    if (helper.isEmpty(obj)) {
      return { success: false, error: errMsg.isEmpty };
    }
    const result = await model.Invoice.destroy({
      where: obj,
    });
    return result;
  }
}

module.exports = ServiceOrder;