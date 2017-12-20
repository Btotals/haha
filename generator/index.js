$(function() {
  const $template = $('#question')

  $('#question-area').append($template.html())

  $('#add').click(function(e) {
    e.preventDefault()
    const $template = $('#question')
    $('#question-area').append($template.html())
  })

  $('#submit').click(function(e) {
    e.preventDefault()

    const children = $('#question-area').children('.question-item')
    const result = Array.prototype.map.call(children, function(child) {
      const $child = $(child)
      const labels = ['A', 'B', 'C', 'D']
      var caseContent = $child.find('.case').val().split('\n')
      var description = $child.find('.description').val().split('\n')
      var options = Array.prototype.map.call($child.find('.label'), function(option, index) {
        return {
          label: labels[index],
          content: $(option).val()
        }
      })
      var answer = $child.find('.answer').val()
      var tips = $child.find('.tips').val().split('\n')

      return {
        case: caseContent,
        description,
        options,
        answer,
        tips
      }

      // console.log('description', description)
      // console.log('options', options)
      // console.log('answer', answer)
      // console.log('tips', tips)
    })

    console.dir(result)

    $('#result').text("module.exports = " + JSON.stringify(result))

    return false
  })
})
