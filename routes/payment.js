'use strict'

const config = require('../config').appConfig

const Payment = require('wechat-pay').Payment
const https = require('https')
const StringDecoder = require('string_decoder').StringDecoder

const decoder = new StringDecoder('utf8')

const initConfig = {
  partnerKey: config.key,
  appId: config.appId,
  mchId: config.mchId,
  notifyUrl: '/paymentNotification'
}

var payment = new Payment(initConfig)

var getUserOpenId = require('./tokenHandler').getUserOpenId

module.exports = function(req, res) {
  var openid = JSON.parse(req.body).openid
  console.log('openid is', openid)

  var order = {
    body: '小程序Demo - 支付体验',
    out_trade_no: Math.random().toString(36).substr(2) + Date.now().toString(),
    total_fee: 1,
    spbill_create_ip: req.ip,
    openid: openid,
    trade_type: 'JSAPI'
  }

  console.log('order is:', order)

  payment.getBrandWCPayRequestParams(order, function(err, payargs){
    console.log('err is:', err)
    console.log('payargs are:', payargs)
    res.json({err, payargs})
    res.end()
  });
}
