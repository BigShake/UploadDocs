module.exports = function (app) {
  app.get('/', function (req, res) {
    // res.redirect('/posts')
    return res.status(200).send({ 'code': 0, 'message': 'success', 'data': 'success' })
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/uploadDocs', require('./uploadFiles'))
  // app.use 第一个参数是 views 目录下的ejs文件中的 href 指向入口，第二个参数是指向js文件

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
