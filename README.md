## webpack多页面脚手架

> 配合`art-template`模板语言实现多页面开发环境，通过`pages.json`来控制页面生成，目录如下：
```json
[{
    "name": "index",  //生成的文件名称，需要在sec文件夹下新建对应的xxx.art模板文件。
    "js": false // 是否添加js文件，false为不添加，如果需要添加则将flase修改成string类型名称，同时在src/js文件夹下新建对应名称的js文件
}]
```

## 食用方法

```bash
npm i
npm run dev
npm run build
```