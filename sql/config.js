module.exports = {
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: 'bokuha0419',
    database:'test', // 前面建的user表位于这个数据库中
    port: 3306
  }
}

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }

  console.log('connected as id ' + connection.threadId)
})
