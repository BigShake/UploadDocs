const sha1 = require('sha1');
const express = require('express');
const router = express.Router();

const UserModel = require('../databases/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res) {
	return res.status(200).send({ 'code': 0, 'message': 'success', 'data': 'success' });
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
	const name = req.fields.name;
	const password = req.fields.password;

	// 校验参数
	try {
		if (!name.length) {
			throw new Error('请填写用户名');
		}
		if (!password.length) {
			throw new Error('请填写密码');
		}
	} catch (e) {
		return res.status(200).send({ 'code': -1, 'message': 'fail', 'data': e.message });
	}

	UserModel.getUserByName(name)
		.then(function (user) {
			if (!user) {
				return res.status(200).send({ 'code': -1, 'message': 'fail', 'data': '用户不存在' });
			}
			// 检查密码是否匹配
			if (sha1(password) !== user.password) {
				return res.status(200).send({ 'code': -1, 'message': 'fail', 'data': '用户名或密码错误' });
			}
			// 用户信息写入 session
			delete user.password;
			req.session.user = user;
			return res.status(200).send({ 'code': 0, 'message': 'success', 'data': '登录成功' });
		})
		.catch(next);
});

module.exports = router;
