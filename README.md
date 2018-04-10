## webpack多页面脚手架

配合`art-template`模板语言实现多页面开发环境，通过`pages.json`来控制页面生成，结构如下：

```js
[{
    "name": "index",  //生成的文件名称，需要在sec文件夹下新建对应的xxx.art模板文件。
    "js": false // 是否添加js文件，false为不添加，如果需要添加则将flase修改成string类型名称，同时在src/js文件夹下新建对应名称的js文件
}]
```

## 目录结构

```tree
.
├── README.md
├── package.json
├── pages.json
├── src
│   ├── assets
│   │   ├── css
│   │   └── js
│   ├── css
│   │   ├── index.css
│   │   └── index.less
│   ├── images
│   │   ├── img01.jpg
│   │   └── img02.jpg
│   ├── index.art
│   ├── js
│   │   └── commons.js
│   └── layout
│       ├── footer.art
│       └── header.art
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## 食用方法

**下载安装**

```bash
npm i
```

**开发使用**

- 修改`pages.json`文件
- 根据`pages.json`文件内容新建对应的`xxx.art`文件和`xxx.js`文件
- 运行命令`npm run dev` or `npm run build`

> 极个别情况下`npm i`下载的包可能不完全，可换用`cnpm i`命令，或者单独下载缺少的依赖包 

模板采用`art-template`，与普通html使用基本相同，只用作`header`、`footer`等重复部分的字符串拼接使用

[art-template教程](http://aui.github.io/art-template/zh-cn/docs/)