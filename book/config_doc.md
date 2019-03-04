此处工程读取配置文件是通过`config-lite`模块。

config-lite 会根据环境变量（NODE_ENV）的不同加载 config 目录下不同的配置文件。

如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置。

config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 NODE_ENV=production node app 启动，则 config-lite 会依次降级查找 config/production.js、config/production.json、config/production.node、config/production.yml、config/production.yaml 并合并 default 配置。

所有要使用的配置文件均在config目录下进行配置。