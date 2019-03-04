module.exports = {
	checkLogin: function checkLogin (req, res, next) {
		if (!req.session.user) {
			// req.flash('error', '未登录')
			// return res.redirect('/signin')
			return res.status(200).send({ 'code': 0, 'message': 'success', 'data': '未登录' });
		}
		next();
	},

	checkNotLogin: function checkNotLogin (req, res, next) {
		if (req.session.user) {
			// req.flash('error', '已登录')
			// return res.redirect('back')// 返回之前的页面
			return res.status(200).send({ 'code': 0, 'message': 'success', 'data': '已登录' });
		}
		next();
	}
};
