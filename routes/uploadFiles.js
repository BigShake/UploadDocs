const express = require('express')
const router = express.Router()
const path = require('path')

const checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, function (req, res, next) {
  res.render('uploadDocs')
  // render指向views目录下的ejs文件
})

//
router.post('/', checkLogin, function (req, res, next) {
  const avatar = req.files.avatar.path.split(path.sep).pop()// 文件路径
  // name, path, size, type

  // 校验参数

  if (!req.files.avatar.name) {
    throw new Error('缺少头像')
  }

  // 写入 flash
  req.flash('success', '上传文档成功')
  // 跳转到首页
  res.redirect('/posts/create')
})

module.exports = router

/**
    在views/commponts/nav-setting.ejs 中添加 uploadDocs 链接,
    uploadDocs 指向 routes/indx.js文件中，
    index.js中 uploadDocs 对应的指向 uploadFiles.js文件中，
    uploadFiles.js文件中，一进入匹配 ‘/’ 目录，render转向 views/ 目录下的 uploadDocs.ejs 文件，然后渲染页面

    总结：
    views目录和route目录，views负责页面展示，routes负责路由转向，
    routes和views之间通过routes/index.js文件保持连接，
    views中通过 href 链接到 routes/index.js，
    routes中通过 render() 转向到 views中的页面
 */
