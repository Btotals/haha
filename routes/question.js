const crud = require('../crud/crud')


function getQuestions(req, res) {
  const questionId = req.body.questionId

  crud.getQuestions({
    questionId
  }, (err, result) => {
    res.end(JSON.stringify(result))
  })
}

module.exports = {
  getQuestions
}
