## webpack多页面脚手架


## 更新

- の更新到0.2版本
    - 使用ejs为新的模板引擎
    - 添加 `static` 静态文件夹
    - 第三方库的引入有两种可选方式
- の 0.1.3
    - 生产环境与开发环境分离
- の 0.1.2
    - 分离第三方库
- の 0.1.1
    - 修复部分bug
- の 0.1
    - 多页面webpack开发环境




配合`ejs`模板语言实现多页面开发环境，通过`pages.json`来控制页面生成，结构如下：

```js
[{
    "name": "index",  //生成的文件名称，需要在src文件夹下新建对应的xxx.ejs
    "js": false // 是否添加js文件，false为不添加，如果需要添加则将flase修改成string类型名称，同时在src/js文件夹下新建对应名称的js文件
}]
```

## 目录结构

```bash
.
├── README.md
├── config //webpack配置文件夹
│   ├── webpack.common.js //公共环境设置
│   ├── webpack.dev.js  //开发环境
│   └── webpack.prod.js //生成环境
├── package.json
├── pages 
│   └── pages.json //页面控制
├── src
│   ├── assets //静态资源
│   │   ├── css
│   │   └── js
│   ├── css
│   │   ├── index.css
│   │   └── index.less
│   ├── images
│   │   └── img01.jpg
│   ├── index.ejs
│   ├── js
│   │   └── commons.js //公共资源
│   └── layout //公共模块
│       ├── footer.ejs
│       ├── header.ejs
│       ├── script.ejs
│       └── style.ejs
└── static //静态资源(不会被webpack解析)
    └── js
```

## 食用方法

**下载安装**

```bash
git clone https://github.com/Mrcxt/webpack3_multipage.git

npm i
```

**开发使用**

- 修改`pages.json`文件
- 根据`pages.json`文件内容新建对应的`xxx.ejs`文件和`xxx.js`文件
- 运行命令`npm run dev` or `npm run build`

> 极个别情况下`npm i`下载的包可能不完全，可换用`cnpm i`命令，或者单独下载缺少的依赖包 


## 其他

~~模板采用`art-template`，与普通html使用基本相同，只用作`header`、`footer`等重复部分的字符串拼接使用~~

目前采用`ejs`模板引擎，相关教程可自行搜索