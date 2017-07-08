'use strict'

const fs = require('fs')
const https = require('https')
const urllib = require('urllib')
const formidable = require('formidable')

const config = require('../config').appConfig

var crypto = require('crypto')

exports.upload = function(req, res) {
  console.log('req comes')

  var form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = './static/'
  form.keepExtensions = true
  form.maxFieldsSize = 2 * 1024 * 1024

  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err)

      res.status(500)
      res.end('internal server error')
    }

    console.log('files:', files.data.name)

    res.status(200)
    res.end('ok')
  })
}

exports.downloadExampleImage = function(req, res){
  var path = './static/image.jpeg'

  res.download(path)
}

exports.downloadExampleDocument = function(req, res){
  var path = './static/example.pdf'

  res.download(path)
}
