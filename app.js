'use strict'

require('./globals')
//require('./setup-qcloud-sdk')

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const config = require('./config')

const MongoClient = require('mongodb').MongoClient

const app = express()

app.set('query parser', 'simple')
app.set('case sensitive routing', true)
app.set('jsonp callback name', 'callback')
app.set('strict routing', true)
app.set('trust proxy', true)

app.disable('x-powered-by')

// 记录请求日志
app.use(morgan('tiny'))

// // parse `application/x-www-form-urlencoded`
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse `application/json`
app.use(bodyParser.json())

/*
app.use(['/record', '/customMessage', '/templateMessage', '/payment'], function(req, res, next) {
  var data=''
  req.setEncoding('utf8')
  req.on('data', function(chunk) {
     data += chunk
  })

  req.on('end', function() {
    req.body = data
    next()
  })
})
*/


app.use('/', require('./routes'))

// 打印异常日志
process.on('uncaughtException', error => {
    console.log(error)
})

var q = require('../a.js')

// 启动server
MongoClient.connect('mongodb://127.0.0.1:27017/db', (err, database) => {
  if (err) return console.log(err)
  global.db = database

  // db.collection('questions').insert(q, function(err) { console.log(err) })

  console.log("Connected successfully to mongodb.")
  // 启动server
  http.createServer(app).listen(config.service.port, () => {
      console.log('Express server listening on port: %s', config.service.port)
  })
})

