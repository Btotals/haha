const http = require('http')
const https = require('https')
const express = require('express')
const config = require('./config').appConfig

const StringDecoder = require('string_decoder').StringDecoder

const app = express()

var token = {
  access_token: null,
  expires_in: null,
  last_update: null
}

app.get('/', function(req, res) {
  getAccessToken(function(access_token) {
    console.log('access_token is:', access_token)

    res.end(JSON.stringify(access_token))
  })
})

http.createServer(app).listen(8888, () => {
  console.log('Express server listening on port: %s', 8888)
})


function getAccessToken(cb) {
  var validatedLimitation = new Date(token.expires_in * 1000 + token.last_update)
  if (!token.access_token || Date.now() > validatedLimitation) {
    requestToken(function(res) {
      console.log('res is', res)
      if (res.errMsg) {
        cb(res)
      } else {
        token.access_token = res.access_token
        token.expires_in = res.expires_in
        token.last_update = Date.now()

        cb(res)
      }
    })
  } else {
    cb(token)
  }
}

function requestToken(cb) {
  var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.secret}`
  console.log('reqesting token from url:', url)

  https.get(url, function(res) {
    var decoder = new StringDecoder('utf8')
    res.on('data', function(d) {
      if (typeof cb === 'function') {
        cb(JSON.parse(decoder.end(d)))
      }
    })
  })
}
