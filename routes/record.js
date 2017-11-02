'use strict'

const fs = require('fs')
const parse = require('csv-parse')

const crud = require('../crud/crud')

const json2csv = require('json2csv')

module.exports = {
  postRecord: postRecord,
  downloadRecord: downloadRecord,
  getUserState: getUserState,
  saveOpinion: saveOpinion
}

// function postRecord(req, res) {
//   var params = JSON.parse(req.body)
//   // console.log(params)

//   var openid = params.openid
//   var score = params.score

//   var options = params.options.join(',')
//   var result = params.result.join(',')

//   fs.readFile('../data.csv', function(err, data) {
//     data += `${openid},${score},${options},${result}\n`
//     fs.writeFile('../data.csv', data, function(err) {
//       if (err) console.log(err)
//       else console.log('record update success')
//     })
//   })

//   res.end('ok')
// }

function postRecord(req, res) {
  var params = req.body

  // console.log('post record with params', JSON.stringify(params))

  // var questionId = params.questionId
  // var openId = params.openId
  // var score = params.score
  // var options = params.options
  // var result = params.result

  crud.insertGrade(params, function(err) {
    if (err) {
      res.end(JSON.stringify(err))
    } else {
      res.end()
    }
  })
}

function downloadRecord(req, res) {
  var query = {
    questionId: req.query.questionId
  }

  crud.getGrade(query, function(err, data) {
    // console.log('download Record:', data)

    if (err) {
      res.end(JSON.stringify(err))
    } else if (data.grades.length) {
      const fields = ['openid', 'score']
      const fieldNames = ['openid', 'score']
      const length = data.grades[0].options.length

      for (let i = 0; i < length; i++) {
        fields.push('options.' + i)
        fieldNames.push(`第${(i + 1)}题选项`)
      }

      for (let i = 0; i < length; i++) {
        fields.push('result.' + i)
        fieldNames.push(`第${(i + 1)}题结果`)
      }

      const csv = json2csv({
        data: data.grades,
        fields: fields,
        fieldNames: fieldNames
      })

      // console.log('parsed csv:', csv)

      res.setHeader('Content-Description', 'File Transfer')
      res.setHeader('Content-Type', 'application/csv; charset=utf-8')
      res.setHeader('Content-Disposition', 'attachment; filename=data.csv')
      res.send(csv)
      // res.end(JSON.stringify({
      //   existed: true,
      //   grades: data.grades
      // }))
    } else {
      res.end(JSON.stringify({
        existed: false,
        grades: null
      }))
    }
  })
}

function getUserState(req, res) {
  // var openid = req.query.openid
  // var questionId = req.query.questionId
  // console.log('openid', openid, 'questionId', questionId)

  var query = {
    openid: req.query.openid
  }

  crud.getGrade(query, function(err, data) {
    if (err) {
      res.end(JSON.stringify(err))
    } else if (data.grades.length) {
      res.end(JSON.stringify({
        existed: true,
        grades: data.grades
      }))
    } else {
      res.end(JSON.stringify({
        existed: false,
        grades: []
      }))
    }
  })
  // fs.readFile('../data.csv', 'utf-8', function(err, data) {
  //   console.log('err is', err)
  //   parse(data, function(error, output) {
  //     console.log('err is', error)
  //     if (error) {
  //       res.end(JSON.stringify(error))
  //       return
  //     }
  //     console.log('output is', output)
  //     var userState = output.find(function(item) {
  //       return item[0] === openid
  //     })

  //     var userInfo

  //     if (userState) {
  //       userInfo = {
  //         existed: true,
  //         userState
  //       }
  //     } else {
  //       userInfo = {
  //         existed: false,
  //         userState: null
  //       }
  //     }

  //     res.end(JSON.stringify(userInfo))
  //   })
  // })
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
