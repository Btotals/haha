'use strict'

const https = require('https')
const request = require('request')
const urllib = require('urllib')

const config = require('../config').appConfig
const token = 'qianyedaodaozhai'
const tokenHandler = require('./tokenHandler')

const StringDecoder = require('string_decoder').StringDecoder

const decoder = new StringDecoder('utf8')

var crypto = require('crypto')

const template_id = config.templateId

module.exports = function(req, res) {
  var params = JSON.parse(req.body)
  var formData = params.formData
  var code = params.code

  var openid = params.openid
  var form_id = params.form_id
  console.log('openid is:', openid)
  console.log('form_id is:', form_id)

  var postData = {
    template_id,
    form_id,
    touser: openid,
    data: {
      keyword1: {
        value: formData.address
      },
      keyword2: {
        value: formData.time
      },
      keyword3: {
        value: formData.name
      },
      keyword4: {
        value: formData.serial
      }
    }
  }

  var postBody = JSON.stringify(postData)
  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': postBody.length
  }

  tokenHandler.getAccessToken(function(access_token) {
    console.log('access_token is:', access_token)

    console.log('headers are', headers)
    console.log('postBody are', postBody)
    urllib.request(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`, {
      method: 'POST',
      headers,
      content: postBody
    }, function(error, response, body) {
      if(error) {
        console.log(error)
        res.end(JSON.stringify(error))
      } else {
        console.log(decoder.end(body.data))
        res.end('{errMsg: ok}')
      }
    })

  })

}
