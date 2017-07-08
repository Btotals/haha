'use strict'

const TunnelService = require('qcloud-weapp-server-sdk').TunnelService
const BlueTunnelHandler = require('../business/bluetooth-tunnel-handler')
const ChatTunnelHandler = require('../business/chat-tunnel-handler')

module.exports = (req, res) => {
  // let handler = new BlueTunnelHandler(req, res)
  let handler = new ChatTunnelHandler(req, res)
  TunnelService.create(req, res).handle(handler, {
    'checkLogin': true,
  })
}
