'use strict'

/*
question: {
  title: '',
  description: '',
  options: [{
    id: ''
  }, {
    id: ''
  }]
},
setting: {
  anonymous: false,
  multiple: false,
  endTime: {
    date: '',
    time: ''
  }
}
*/

module.exports = function(req, res) {
  console.log(req.body)

  var body = req.body


}

function bindCustomMessageDomain(req, res) {
  var shasum = crypto.createHash('sha1')

  var params = req.query

  console.log(params)

  var temp = [params.nonce, params.timestamp, token]
  var str = temp.sort((a, b)=> a > b).join('')

  console.log(str)

  shasum.update(str)

  if (shasum.digest('hex') === params.signature) {
    console.log('verification success')
    res.end(params.echostr)
  } else {
    res.end()
  }

  shasum = null
}

function handleCustomMessagePost(req, res) {
  console.log(req.body)
  console.log(req.query)

  var params = JSON.parse(req.body)

  console.log('params MsgType is:', params.MsgType)

  if (params.MsgType === 'event') {
    if (params.Event === 'wxa_dynamic_data') {
      postDynamicData(req, res)
    } else {
      postWelcomeMessage(req, res)
    }
  } else if (params.MsgType === 'text') {
    console.log('postTextMessage')
    postTextMessage(req, res)
  }



  res.end('')
}

function postWelcomeMessage(req, res) {
  var params = JSON.parse(req.body)
  var postData = {
    'touser': params.FromUserName,
    'msgtype': 'text',
    'text': {
      'content': '欢迎使用小程序Demo - 客服消息助手, 作为功能展示, 助手将回放(echo)您发送的所有文本内容'
    }
  }

  console.log('postWelcomeMessage, postData is', postData)

  sendHttpsPostRequest(postData)
}

function postTextMessage(req, res) {
  var params = JSON.parse(req.body)
  var content = params.Content
  var sendTime = new Date(params.CreateTime * 1000)

  var postData = {
    'touser': params.FromUserName,
    'msgtype': 'text',
    'text': {
      'content': `您刚刚发送的内容是 '${content}' , 发送于${sendTime.toLocaleString()}\n  - 来自小程序Demo 客服消息助手`
    }
  }

  console.log('sendHttpsPostRequest, postData is', postData)

  sendHttpsPostRequest(postData)
}

function postDynamicData(req, res) {
  var body = JSON.parse(req.body)
  var ToUserName = body.ToUserName
  var FromUserName = body.FromUserName
  var key = body.key

  var postData = {
    key: key,
    data: 'test string',
    lifespan: 3600,
    create_time: parseInt(new Date() / 1000)
  }

  sendHttpsPostRequest(postData)
}

function sendHttpsPostRequest(postData) {
  console.log('getting access_token')
  getAccessToken(function(access_token) {
    console.log('access_token is', access_token)

    var postBody = JSON.stringify(postData)
    var headers = {
      'Content-Type': 'application/json',
      'Content-Length': postBody.length,
      'Connection': 'keep-alive'
    }

    urllib.request(`https://api.weixin.qq.com/wxa/setdynamicdata?access_token=${access_token}`, {
      method: 'POST',
      headers,
      content: postBody
    }, function(error, response, body) {
      if(error) {
        console.log(error)
      } else {
        var decoder = new StringDecoder('utf8')
        console.log('response data is:', decoder.end(body.data))
      }
    })

  })
}
