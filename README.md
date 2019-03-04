# UploadDocs
upload and read pdf document

## 开发
- MongoDB + Express

## 目录
```
.
├── book            文档目录
├── config          配置文件目录
├── databases       数据库目录
├── index.js        初始化文件
├── logs            日志目录
├── middlewares     中间件目录
├── package.json    
├── files           保存文件路径
├── README.md       
├── remarks         备注文件
└── routes          路由目录
```

## 接口文档

##### 注册账户
- request
```
    method: 'POST',
    url: 'http: //127.0.0.1:3000/signup',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    formData: { 
        avatar: { 
            value: 'fs.createReadStream("/home/shawanning/图片/头像.jpg")',
            options: { 
                filename: '/home/shawanning/图片/头像.jpg',
                contentType: null
            }
        },//头像，文件类型,必填
        name: 'fcy',//姓名，必填
        password: '123456',//密码，至少 6 个字符，必填
        repassword: '123456',//重复密码，必填
        gender: 'f',//性别只能是 m、f 或 x，必填
        bio: 'LLLLLLLLLLLL'//个人简介请限制在 1-30 个字符，必填
    }
```

- response
```
    {
        "code": 0,//0或者-1，成功或者失败
        "message": "success",//success或者fail
        "data": "注册成功"//用户名已被占用,名字请限制在 1-10 个字符,性别只能是 m、f 或 x,个人简介请限制在 1-30 个字符,缺少头像,密码至少 6 个字符,两次输入密码不一致
    }

    {
        "code": -1,
        "message": "fail",
        "data": "用户名已被占用"
    }
``` 

##### 登录

- request
```
    { 
        method: 'POST',
        url: 'http: //127.0.0.1:3000/signin',
        headers: {
        'Content-Type': 'application/json'
        },
        formData: { 
            name: 'fcy', //必填,姓名
            password: '123456' //必填，密码
        }
    }
```

- response
```
    {
        "code": 0,//0或者-1，成功或者失败
        "message": "success",//success或者fail
        "data": "登录成功"// 用户不存在,用户名或密码错误,请填写用户名,请填写密码,登录成功
    }
``` 

##### 登出

- request
```
    method: 'GET',
    url: 'http://127.0.0.1:3000/signout',
```

- response
```
    {
        "code": 0,//0或者-1，成功或者失败
        "message": "success",//success或者fail
        "data": "登出成功"
    }
```

##### 注销账户
- request
```
```

- response
```
``` 