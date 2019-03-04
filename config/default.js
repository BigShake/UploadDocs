module.exports = {
	port: 3000,
	session: {
		secret: 'uploadDocs',
		key: 'uploadDocs',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://swn:123456@127.0.0.1:27017/uploadDocs'
};
