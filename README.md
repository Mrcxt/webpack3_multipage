## webpack 多页面脚手架

## 更新

- **の重要更新 1.0 版本**
  - 使用 `vue` 替换 `ejs` 模板引擎。
  - 默认未安装 `vue-router`
  - 基于 vue-cli 修改，性能更优。

---

- の更新到 0.2 版本
  - 使用 ejs 为新的模板引擎
  - 添加 `static` 静态文件夹
  - 第三方库的引入有两种可选方式
- の 0.1.3
  - 生产环境与开发环境分离
- の 0.1.2
  - 分离第三方库
- の 0.1.1
  - 修复部分 bug
- の 0.1
  - 多页面 webpack 开发环境

## 目录结构

```bash
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── package-lock.json
├── package.json
├── src
│   ├── assets
│   │   └── bg.jpg
│   ├── components
│   │   ├── footer.vue
│   │   └── header.vue
│   └── pages
│       ├── cell
│       │   ├── cell.html
│       │   ├── cell.js
│       │   └── cell.vue
│       └── index
│           ├── index.html
│           ├── index.js
│           └── index.vue
└── static
```

## 食用方法

**下载安装**

```bash
git clone https://github.com/Mrcxt/webpack3_multipage.git

npm i
```

**开发使用**

1.  在 `src/pages/` 新建对应页面的文件夹以及 `.js`、`.vue`、`.html`文件。结构如下

```bash
        pages
│       ├── cell
│       │   ├── cell.html
│       │   ├── cell.js
│       │   └── cell.vue
│       └── index
│           ├── index.html
│           ├── index.js
│           └── index.vue
```

2.  运行命令`npm run dev` or `npm run build`

> 极个别情况下`npm i`下载的包可能不完全，可换用`cnpm i`命令，或者单独下载缺少的依赖包

## 其他

保留 0.2 `ejs` 版本，在 [old/](/old/) 目录之下。
