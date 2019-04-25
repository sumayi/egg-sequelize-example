'use strict';
module.exports = {
  FinanceData: {
    license: { type: 'string', example: 's1234', required: false },
    Applytype: { type: 'string', example: 's1234', required: false },
    IDcardFront: { type: 'string', example: 's1234', required: false },
    IDcardReverse: { type: 'string', example: 's1234', required: false },
    MerchantId: { type: 'string', example: 's1234', required: false },
    Phone: { type: 'string', example: 's1234', required: false },
    Bank: { type: 'string', example: 's1234', required: false },
    BranchBank: { type: 'string', example: 's1234', required: false },
    BankNum: { type: 'string', example: 's1234', required: false },
  },
  FinanceBrief: {
    Money: { type: 'number', required: true, example: 1234 },
    OrderNumber: { type: 'string', required: true, example: 's1234' },
    State: { type: 'string', required: true, example: 'P' },
    MerchantId: { type: 'string', required: true, example: 's1234' },
  },
  Finance: {
    Money: { type: 'number', required: true, example: 1234 },
    ApplyType: { type: 'string', required: true, example: 'W' },
    Type: { type: 'string', required: true, example: 'O' },
    MerchantId: { type: 'string', required: true, example: 's1234' },
  },
  Voucher: {
    Money: { type: 'number', required: false, example: 1223 },
    Detail: { type: 'string', required: false, example: 'qasqeqwe' },
    MerchantId: { type: 'string', required: false, example: 'qwe123' }
  },
  InvoiceData: {
    MerchantId: { type: 'string', required: false, example: 's1234' },
    State: { type: 'string', required: false, example: 'N' },
    Name: { type: 'string', required: false, example: 'ASDF' },
    TaxNumber: { type: 'string', required: false, example: 's1234' },
    ComAddress: { type: 'string', required: false, example: 's1234' },
    Money: { type: 'number', required: false, example: 1234 },
    Phone: { type: 'string', required: false, example: 's1234' },
    Bank: { type: 'string', required: false, example: 's1234' },
    BankNum: { type: 'string', required: false, example: 's1234' },
  },
  ExpressData: {
    MerchantId: { type: 'string', required: false, example: 's1234' },
    User: { type: 'string', required: false, example: 'Nsd' },
    Phone: { type: 'string', required: false, example: 's1234' },
    ExpCity: { type: 'string', required: false, example: 's1234' },
    ExpAddress: { type: 'number', required: false, example: '1234' },
  },
  Invoice: {
    MerchantId: { type: 'string', required: false, example: 's1234' },
    Vstate: { type: 'string', required: false, example: 'W' },
    Money: { type: 'number', required: false, example: 1234 }
  }
};