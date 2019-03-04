const path = require('path');
const express = require('express');// web 框架
const session = require('express-session');// session 中间件
const MongoStore = require('connect-mongo')(session);// 将 session 存储于 mongodb，结合 express-session 使用
const flash = require('connect-flash');// 页面通知的中间件，基于 session 实现
const formidable = require('express-formidable');// 接收表单及文件上传的中间件
const config = require('config-lite')(__dirname);// 读取配置文件
const routes = require('./routes');// routes路由文件夹
const pkg = require('./package');
const winston = require('winston');// 日志
const expressWinston = require('express-winston');// express 的 winston 日志中间件

const app = express();
/**
 * 由于 HTTP 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话（Session）。
 *
 * cookie 与 session 的区别
 *  cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
 *  通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
 *  session 更安全，cookie 可以直接在浏览器查看甚至编辑
 */
// session 中间件
app.use(session({
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave: true, // 强制更新 session
	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
	cookie: {
		maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore({// 将 session 存储到 mongodb
		url: config.mongodb// mongodb 地址
	})
}));

/**
 *  注意：中间件的加载顺序很重要。
 *  如上面  设置静态文件目录  的中间件应该放到 routes(app) 之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；
 *  flash 中间件应该放到 session 中间件之后加载，因为 flash 是基于 session 实现的。
 */
// flash 中间件，用来显示通知
app.use(flash());

// 处理表单及文件上传的中间件
app.use(formidable({
	uploadDir: path.join(__dirname, 'files/img'), // 上传文件目录
	keepExtensions: true// 保留后缀
}));

// 设置模板全局常量
app.locals.blog = {
	title: pkg.name,
	description: pkg.description
};

// 添加模板必需的三个变量
app.use(function (req, res, next) {
	res.locals.user = req.session.user;
	res.locals.success = req.flash('success').toString();
	res.locals.error = req.flash('error').toString();
	next();
});

// 正常请求的日志
app.use(expressWinston.logger({
	transports: [
		new (winston.transports.Console)({
			json: true,
			colorize: true
		}),
		new winston.transports.File({
			filename: 'logs/success.log'
		})
	]
}));
// 路由
routes(app);
// 错误请求的日志
app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.Console({
			json: true,
			colorize: true
		}),
		new winston.transports.File({
			filename: 'logs/error.log'
		})
	]
}));

// 错误处理，通过next()处理
app.use(function (err, req, res, next) {
	console.error(err);
	// req.flash('error', err.message)
	// res.redirect('/posts')
	return res.status(200).send({ 'code': -1, 'message': 'fail', 'data': err.message });
});

if (module.parent) {
	// 被 require，则导出 app
	module.exports = app;
} else {
	// 监听端口，启动程序
	app.listen(config.port, function () {
		console.log(`${pkg.name} listening on port ${config.port}`);
	});
}
