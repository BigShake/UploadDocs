module.exports = {
	checkLogin: function checkLogin (req, res, next) {
		if (!req.session.user) {
			return res.status(200).send({ 'code': 0, 'message': 'success', 'data': '未登录' });
		}
		next();
	},

	checkNotLogin: function checkNotLogin (req, res, next) {
		if (req.session.user) {
			return res.status(200).send({ 'code': 0, 'message': 'success', 'data': '已登录' });
		}
		next();
	}
};
