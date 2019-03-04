## 使用eslint格式化代码

- 全局安装eslint
```
npm i -g eslint
```
- 初始化eslint
在工程目录下运行：
```
eslint --init
```
然后再选择选项：
```
How would you like to configure ESLint? 
Are you using ECMAScript 6 features? //是否用到ES6？选择Y
Are you using ES6 modules?  //是否用到ES6模块？如果写node，选N，写前端，选Y
Where will your code run? //选择后端node或者前端 Browser 
Do you use JSX? //是否用JSX，不写react选N
What type of indentation style do you use?   //缩进使用tab或者空格？
What quotes do you use for strings?  //字符串用单引号还是双引号？
What line endings do you use?//linux/mac上选择Unix，windows选择windows
Do you require semicolons? //行尾是否需要添加分号？
What format do you want your config file to be in? //使用js或者json来定义？
```
完成后会生成`.eslintrc.json`文件
然后再在文件中添加：
```
#表示使用console.log()等方法
"no-console": 0,
"eqeqeq": 2
```
- 在vscode设置中：
```
{
    "eslint.enable": true,//启用eslint
    "eslint.autoFixOnSave": true,//保存时自动lint
    "files.eol": "\n",//如果你在linux/mac上开发，请添加这一项，windows请忽略
    "editor.insertSpaces": false//禁止自动添加空格，因为我们前面定义使用tab缩进，如果你使用空格缩进请忽略
}
```
