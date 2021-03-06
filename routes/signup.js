const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
const express = require('express');
const router = express.Router();

const UserModel = require('../databases/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

/**
 * 访问每个页面之前都先进行是否登录的检查，express的router模块，可以进行多个回调函数处理路由
 * http://www.expressjs.com.cn/guide/routing.html
 */
// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res) {
	return res.status(200).send({ 'code': 0, 'message': 'success', 'data': 'success' });
});

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
	req.fields.avatar = req.files.avatar;
	const name = req.fields.name;
	const gender = req.fields.gender;
	const bio = req.fields.bio;
	const avatar = req.fields.avatar.path.split(path.sep).pop();
	let password = req.fields.password;
	const repassword = req.fields.repassword;

	// 校验参数
	try {
		if (!(name.length >= 1 && name.length <= 10)) {
			throw new Error('名字请限制在 1-10 个字符');
		}
		if (['m', 'f', 'x'].indexOf(gender) === -1) {
			throw new Error('性别只能是 m、f 或 x');
		}
		if (!(bio.length >= 1 && bio.length <= 30)) {
			throw new Error('个人简介请限制在 1-30 个字符');
		}
		if (!req.fields.avatar.name) {
			throw new Error('缺少头像');
		}
		if (password.length < 6) {
			throw new Error('密码至少 6 个字符');
		}
		if (password !== repassword) {
			throw new Error('两次输入密码不一致');
		}
	} catch (e) {
		// 注册失败，异步删除上传的头像
		fs.unlink(req.fields.avatar.path);
		return res.status(200).send({ 'code': -1, 'message': 'fail', 'data': e.message });
	}

	// 明文密码加密
	password = sha1(password);

	// 待写入数据库的用户信息
	let user = {
		name: name,
		password: password,
		gender: gender,
		bio: bio,
		avatar: avatar
	};
	// 用户信息写入数据库
	UserModel.create(user)
		.then(function (result) {
			// 此 user 是插入 mongodb 后的值，包含 _id
			user = result.ops[0];
			// 删除密码这种敏感信息，将用户信息存入 session
			delete user.password;
			req.session.user = user;
			return res.status(200).send({ 'code': 0, 'message': 'success', 'data': '注册成功' });
		})
		.catch(function (e) {
			// 注册失败，异步删除上传的头像
			fs.unlink(req.fields.avatar.path);
			// 用户名被占用则跳回注册页，而不是错误页
			if (e.message.match('duplicate key')) {
				return res.status(200).send({ 'code': -1, 'message': 'fail', 'data': '用户名已被占用' });
			}
			next(e);
		});
});

module.exports = router;
