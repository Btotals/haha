const fs = require('fs')
const parse = require('csv-parse')

module.exports = {
  postRecord: postRecord,
  downloadRecord: downloadRecord,
  getUserState: getUserState,
  saveOpinion: saveOpinion
}

function postRecord(req, res) {
  var params = JSON.parse(req.body)
  // console.log(params)

  var openid = params.openid
  var score = params.score

  var options = params.options.join(',')
  var result = params.result.join(',')

  fs.readFile('../data.csv', function(err, data) {
    data += `${openid},${score},${options},${result}\n`
    fs.writeFile('../data.csv', data, function(err) {
      if (err) console.log(err)
      else console.log('record update success')
    })
  })

  res.end('ok')
}

function downloadRecord(req, res) {
  var path = '../data.csv'

  res.download(path)
}

function getUserState(req, res) {
  var openid = req.query.openid
  console.log('openid', openid)
  fs.readFile('../data.csv', 'utf-8', function(err, data) {
    console.log('err is', err)
    parse(data, function(error, output) {
      console.log('err is', error)
      if (error) {
        res.end(JSON.stringify(error))
        return
      }
      console.log('output is', output)
      var userState = output.find(function(item) {
        return item[0] === openid
      })

      var userInfo

      if (userState) {
        userInfo = {
          existed: true,
          userState
        }
      } else {
        userInfo = {
          existed: false,
          userState: null
        }
      }

      res.end(JSON.stringify(userInfo))
    })
  })
}

function saveOpinion(req, res) {
  var openid = req.body.openid
  var opinion = req.body.question

  fs.readFile('../opinion.csv', 'utf-8', function(err, data) {
    parse(data, function(error, output) {
      output += `${openid},${opinion}`

      fs.writeFile('../opinion.csv', data, function(err) {
        if (err) {
          console.log(err)
          res.end(JSON.stringify(err))
        } else {
          console.log('record update success')
          res.end('ok')
        }
      })

    })
  })
}
