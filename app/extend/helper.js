'use strict';

const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor === undefined ? (typeof v) : v.constructor.name.toLowerCase());
const isEmpty = val => val == null || !(Object.keys(val) || val).length;
// eslint-disable-next-line no-self-compare
const isNumber = val => typeof val === 'number' && val === val;
const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
const pickTrueValue = obj => pickBy(obj, v => v !== undefined);
const isJson = obj => getType(obj) === 'object';
const MathNum = (n = 10) => Math.random().toString().substr(2, n);
module.exports = {
  /**
   * some helpful function
   * useage eg:
   * this.ctx.helper.getType()
   */
  getType,
  isEmpty,
  isNumber,
  pickBy,
  pickTrueValue,
  isJson,
  MathNum
};
