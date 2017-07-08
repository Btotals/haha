const ObjectId = require('mongodb').ObjectId

module.exports = {
  insertSurvey: function(survey, callback) {
    db.collection('survey').insert(survey, function(err) {
      if (err) {
        callback(err)
      } else {
        callback(null, {
          surveyId: survey._id
        })
      }
    })
  },

  getSurveys: function(query, callback) {
    var openid = query.openid

    db.collection('survey').find({
      openid
    }, function(err, res) {
      console.log('', res)

      if (err) {
        callback(err)
      } else {
        res.toArray().then(function(docs) {
          callback(null, {
            surveys: docs
          })
        }).catch(function(parseErr) {
          callback(parseErr)
        })
      }
    })
  },

  getQuestions: function(query, callback) {
    var questionId = query.questionId

    db.collection('questions').findOne({
      _id: ObjectId(questionId)
    }, function(err, questions) {
      console.log('find questions by _id', questionId, 'success, questions is', JSON.stringify(questions))

      if (err) {
        callback(err)
      } else {
        callback(null, questions)
      }
    })
  },

  getGrade: function(query, callback) {
    var id = query.id

    db.collection('grade').findOne({
      _id: ObjectId(id)
    }, function(err, grade) {
      console.log('findOne grade by _id', _id, 'success, grade is', grade)

      if (err) {
        callback(err)
      } else {
        callback(null, grade)
      }
    })
  },

  updateSurvey: function(survey, callback) {
    var id = survey.id
    var attender = survey.attender

    console.log('survey id', id, 'updated with attender', JSON.stringify(attender))

    db.collection('survey').findOneAndUpdate({
      _id: ObjectId(id)
    }, {
      $push: {
        attenders: attender
      }
    }, function(err, res) {
      if (err) {
        console.log('updateSurvey error', err)
        callback(err)
      } else {
        console.log('updateSurvey success, res is', res)
        callback(null, res.value)
      }
    })
  }
}

