'use strict';

const LoginService = require('qcloud-weapp-server-sdk').LoginService;

module.exports = (req, res) => {
    console.log(req.header())
    LoginService.create(req, res).login();
};