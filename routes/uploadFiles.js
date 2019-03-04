const express = require('express');
const router = express.Router();
const path = require('path');

const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function (req, res) {
	return res.status(200).send({ 'code': 0, 'message': 'success', 'data': 'success' });
});

//
router.post('/', checkLogin, function (req, res) {
	const avatar = req.files.avatar.path.split(path.sep).pop();// 文件路径
	// name, path, size, type

	// 校验参数

	if (!req.files.avatar.name) {
		throw new Error('缺少头像');
	}
	return res.status(200).send({ 'code': 0, 'message': 'success', 'data': '上传文档成功' });
});

module.exports = router;

