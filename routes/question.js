const crud = require('../crud/crud')


function getQuestions(req, res) {
  const params = JSON.parse(req.body)

  const questionId = params.questionId

  crud.getQuestions({
    questionId
  }, (err, result) => {
    res.end(JSON.stringify(result))
  })
}

module.exports = {
  getQuestions
}
