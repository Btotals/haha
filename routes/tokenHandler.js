'use strict'

const http = require('http')
const https = require('https')
const StringDecoder = require('string_decoder').StringDecoder


var token = {
  access_token: null,
  expires_in: null,
  last_update: null
}

const config = require('../config').appConfig

function requestToken(cb) {
  console.log('reqesting token')
  // var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.secret}`
  // https.get(url, function(res) {
  var url = 'http://localhost:8888'
  http.get(url, function(res) {
    var decoder = new StringDecoder('utf8')
    res.on('data', function(d) {
      if (typeof cb === 'function') {
        cb(JSON.parse(decoder.end(d)))
      }
    })
  })
}

function getAccessToken(cb) {
  var validatedLimitation = new Date(token.expires_in * 1000 + token.last_update)
  if (!token.access_token || Date.now() > validatedLimitation) {
    requestToken(function(res) {
      console.log('access_token res is', res)
      if (res.errMsg) {
        cb(res.errMsg)
      } else {
        token.access_token = res.access_token
        token.expires_in = res.expires_in
        token.last_update = Date.now()

        cb(res.access_token)
      }
    })
  } else {
    cb(token.access_token)
  }
}

function getUserOpenId(code, cb) {
  var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.secret}&js_code=${code}&grant_type=authorization_code`
  console.log(url)
  https.get(url, function(res) {
    var decoder = new StringDecoder('utf8')
    res.on('data', function(d) {
      if (cb && typeof cb === 'function') {
        cb(JSON.parse(decoder.end(d)))
      }
    });
  })
}

module.exports = {
  getAccessToken,
  getUserOpenId
}


