'use strict'

const config = require('../config').appConfig
const fs = require('fs')
const parse = require('csv-parse')
const https = require('https')
const StringDecoder = require('string_decoder').StringDecoder

const decoder = new StringDecoder('utf8')

var getUserOpenId = require('./tokenHandler').getUserOpenId

module.exports = function(req, res) {
  var query = req.query
  var code = query.code

  //console.log('code is', code)

  getUserOpenId(code, function(result) {
    var openid = result.openid
    fs.readFile('./validUsers.csv', 'utf-8', function(err, data) {
      //console.log('err is', err)
      parse(data, function(error, output) {
        //console.log('err is', error)
        if (error) {
          res.end(JSON.stringify(error))
          return
        }

        var isValid = !!output.find(function(item) {
          return item[0] === openid
        })
        res.status(200)
        res.end(JSON.stringify({
          openid,
          isValid
        }))
      })
    })

  })
}
