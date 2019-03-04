const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const formidable = require('express-formidable');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
const winston = require('winston');
const expressWinston = require('express-winston');

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
	name: config.session.key,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: config.session.maxAge
	},
	store: new MongoStore({
		// 将 session 存储到 mongodb
		url: config.mongodb
	})
}));

// 处理表单及文件上传的中间件
app.use(formidable({
	uploadDir: path.join(__dirname, 'files/img'), // 上传文件目录
	keepExtensions: true// 保留后缀
}));

// 添加模板必需的三个变量
app.use(function (req, res, next) {
	res.locals.user = req.session.user;
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

// 路由
routes(app);

// 错误处理，通过next()处理
app.use(function (err, req, res) {
	console.error(err.message);
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
