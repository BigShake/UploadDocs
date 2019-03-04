module.exports = function (app) {
	app.get('/', function (req, res) {
		return res.status(200).send({ 'code': 0, 'message': 'success', 'data': 'success' });
	});
	
	// app.use 第一个参数请求过来的匹配的后缀，第二个参数是指向js文件，即业务处理逻辑部分
	app.use('/signup', require('./signup'));
	app.use('/signin', require('./signin'));
	app.use('/signout', require('./signout'));
	app.use('/uploadDocs', require('./uploadFiles'));
	
	// 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			return res.status(404).send({ 'code': -1, 'message': 'fail', 'data': '404错误' });
		}
	});
};
