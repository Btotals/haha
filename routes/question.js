'use strict'

const crud = require('../crud/crud')

function getQuestions(req, res) {
  const questionId = req.body.questionId

  crud.getQuestions({
    questionId
  }, (err, result) => {
    // console.log(result)
    res.end(JSON.stringify(result.questions))
  })
}

function postAnswers(req, res) {
  const body = req.body

  const openid = body.openid
  const score = params.score

  const options = params.options
  const result = params.result

  crud.insertGrade({
    openid,
    score,
    options,
    result
  })
}

module.exports = {
  getQuestions,
  postAnswers
}
