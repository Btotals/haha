'use strict'

const TunnelService = require('qcloud-weapp-server-sdk').TunnelService

var tunnelMap = []
var request

class BluetoothUserTunnelHandler {
  constructor(req, res) {
    this.req = req
  }

  onRequest(tunnelId) {
  }

  onConnect(tunnelId) {
    var isPC = this.req.query.isPC
    console.log(`tunnel ${tunnelId} is requesting`, 'isPC:', isPC)

    tunnelMap.push({tunnelId, isPC})
  }

  onMessage(tunnelId, type, content) {
    console.log(`tunnel ${tunnel} has sent type: ${type} message`, content)

    tunnelMap.forEach(function(item) {
      if (item.tunnelId != tunnelId) {
        TunnelService.emit(item.tunnelId, type, content)
      }
    })
  }

  onClose(tunnelId) {
    console.log(`tunnel ${tunnelId} is closing`)
  }


}

module.exports = BluetoothUserTunnelHandler

