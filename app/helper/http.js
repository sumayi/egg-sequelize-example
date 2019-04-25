/**
 * @author : urcool
 */
'use strict';
/**
 * @class http request
 * [ get, post(formdata), put, delete, postJson(json)]
 * @param  {Object}  app instance of application
 * @return {Object}  request result
 */
module.exports = app => {
  /**
   * app is instance of application
   * get baseUrl from config
   */
  const { baseUrl } = app.config.api;
  /**
   * @return {Object}
   */
  return {
    /**
     * @function GET
     * @param  {string} url    request url
     * @param  {Object} params request params
     * @return {Object}        request data
     */
    async get(url, params = {}) {
      /**
       * get request result
       */
      const result = await app.curl(`${baseUrl}${url}`, {
        params,
        // default method is GET
        // method: 'GET',
        dataType: 'json',
      });
      return result.data;
    },
    /**
     * @function POST
     * cont-type: application/x-www-form-urlencoded
     * @param  {string} url    request url
     * @param  {Object} params request params
     * @return {Object}        request data
     */
    async post(url, params = {}) {
      const result = await app.curl(`${baseUrl}${url}`, {
        // 必须指定 method
        method: 'POST',
        // 可以不需要设置 contentType，HttpClient 会默认以 application/x-www-form-urlencoded 格式发送请求
        // contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        // data
        data: params,
        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
        dataType: 'json',
      });
      return result.data;
    },
    /**
     * @function POST
     * cont-type: application/json
     * @param  {string} url    request url
     * @param  {Object} params request params
     * @return {Object}        request data
     */
    async postJson(url, params = {}) {
      const result = await app.curl(`${baseUrl}${url}`, {
        // 必须指定 method
        method: 'POST',
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        data: params,
        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
        dataType: 'json',
      });
      return result.data;
    },
    /**
     * @function PUT
     * cont-type: application/json
     * @param  {string} url    request url
     * @param  {Object} params request params
     * @return {Object}        request data
     */
    async put(url, params = {}) {
      const result = await app.curl(`${baseUrl}${url}`, {
        // 必须指定 method
        method: 'PUT',
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        data: params,
        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
        dataType: 'json',
      });
      return result.data;
    },
    /**
     * @function DELETE
     * cont-type: application/json
     * @param  {string} url    request url
     * @return {Object}        request data
     */
    async del(url) {
      const result = await app.curl(`${baseUrl}${url}`, {
        // 必须指定 method
        method: 'DELETE',
        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
        dataType: 'json',
      });
      return result.data;
    },
  };
};
