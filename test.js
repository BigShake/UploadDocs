const express = require('express')
const app = express()

app.use(function (req, res, next) {
  console.log('1')
  throw new Error('ssss')
})

app.use(function (req, res, next) {
  console.log('2')
  res.status(200).end()
})

//错误处理
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.message)
})

app.listen(3000)