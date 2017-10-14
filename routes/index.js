'use strict'

const express = require('express')
const router = express.Router()
const file = require('./file')
const record = require('./record')

const question = require('./question')

router.get('/', require('./welcome'))
/*
router.get('/login', require('./login'))
router.get('/user', require('./user'))
router.all('/tunnel', require('./tunnel'))
*/
router.get('/openid', require('./openid'))

router.get('/downloadRecord', record.downloadRecord)
router.get('/userState', record.getUserState)
router.post('/record', record.postRecord)

router.post('/answer', question.postAnswers)

router.get('/question', question.getQuestions)


/*
router.get('/testRequest', require('./testRequest'))
router.all('/payment', require('./payment'))
router.all('/customMessage', require('./customMessage'))
router.all('/templateMessage', require('./templateMessage'))

router.post('/upload', file.upload)
router.get('/static/image.jpeg', file.downloadExampleImage)
router.get('/static/example.pdf', file.downloadExampleDocument)

router.get('/weapp.zip', file.downloadZip)
*/
module.exports = router

