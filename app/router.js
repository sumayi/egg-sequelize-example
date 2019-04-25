'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('FinanceData', '/FinanceData', controller.financeData);
  router.resources('FinanceBrief', '/FinanceBrief', controller.financeBrief);
  router.resources('Finance', '/Finance', controller.finance);
  router.resources('Voucher', '/Voucher', controller.voucher);
  router.resources('InvoiceData', '/InvoiceData', controller.invoiceData);
  router.resources('ExpressData', '/ExpressData', controller.expressData);
  router.resources('Invoice', '/Invoice', controller.invoice);
};
