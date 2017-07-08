'use strict'

const TunnelService = require('qcloud-weapp-server-sdk').TunnelService

var tunnelMap = {}
var request

class ChatTunnelHandler {
  constructor(req, res) {
    this.req = req
  }

  onRequest(tunnelId, userInfo) {
    console.log('tunnelId is:', tunnelId)
    console.log('userInfo is:', userInfo)
  }

  onConnect(tunnelId) {
  }

  onMessage(tunnelId, type, content) {
    console.log(`tunnel ${tunnelId} has sent type: ${type} message`, content)

    TunnelService.emit(tunnelId, type, 'Hello from socket server!')
  }

  onClose(tunnelId) {
    console.log(`tunnel ${tunnelId} is closing`)
  }

}

module.exports = ChatTunnelHandler

