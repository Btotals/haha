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

module.exports = {
  getQuestions
}
