
## 初始化mongo数据库

1. 以auth方式启动数据库
```
docker run --name mongo -p 27017:27017  -d mongo --auth
```
2. 进入数据库并创建管理用户的用户`shawanning`，并创建即将使用的数据库`uploadDocs`，并创建该数据库的验证用户`swn`
```
:~$ docker exec -it mongo mongo admin
MongoDB shell version v4.0.1
connecting to: mongodb://127.0.0.1:27017/admin
MongoDB server version: 4.0.1
Welcome to the MongoDB shell.
//创建管理用户的用户
> db.createUser({user:"shawanning",pwd:"123456",roles:[{role:"userAdminAnyDatabase",db:"admin"}]})
Successfully added user: {
	"user" : "shawanning",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
//用户验证
> db.auth("shawanning",'123456')
1
//创建数据库
> use uploadDocs
switched to db uploadDocs
//创建数据库用户
> db.createUser({user:"swn",pwd:"123456",roles:[{role:"readWrite",db:"uploadDocs"}]})
Successfully added user: {
	"user" : "swn",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "uploadDocs"
		}
	]
}
```
3. 退出重新登录`uploadDocs`数据库
```
:~$ docker exec -it mongo mongo uploadDocs
MongoDB shell version v4.0.1
connecting to: mongodb://127.0.0.1:27017/uploadDocs
MongoDB server version: 4.0.1
> db.auth('swn','123456')
1
> show dbs
```

至此，可以启动服务，`show dbs`将会展示新创建的数据表