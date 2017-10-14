const ObjectId = require('mongodb').ObjectId

module.exports = {
  getQuestions: function(query, callback) {
    var questionId = query.questionId

    db.collection('questions').find({
      // _id: ObjectId(questionId)
    }, function(err, res) {
      // console.log('find questions by _id', questionId, 'success, questions is', JSON.stringify(questions))

      res.toArray().then(function(docs) {
        callback(null, {
          questions: docs
        })
      }).catch(function(parseErr) {
        callback(parseErr)
      })

    })
  },

  getGrade: function(query, callback) {
    var openid = query.openid

    db.collection('grade').find({
      openid
    }, function(err, docs) {
      if (err) {
        callback(err)
      }

      console.log('find grade by openid', openid, 'success')

      res.toArray().then(function(docs) {
        callback(null, {
          grades: docs
        })
      }).catch(function(parseErr) {
        callback(parseErr)
      })

    })
  },

  insertGrade: function(grade, callback) {
    db.collection('grade').insert(grade, function(err) {
      if (err) {
        callback(err)
      } else {
        callback(null, {})
      }
    })
  }
}

