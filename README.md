## 简介

使用 typescript 编写一个包含 webpack 打包，单元测试，可持续集成的 JavaScript 库。

编写的 JavaScript 库取名为 parsemarkdown，将会实现如下功能：
1、解析指定目录下的 markdown 文件
2、生成约定格式的目标文件，放置于指定目录
3、监听文件变动，实现自动编译与增量编译

## 安装

安装依赖包

```bash
npm install parsemarkdown
```

## 应用场景：解析 markdown 文件

1、创建一个 JavaScript 文件 generate.js，填写如下内容：

```js
// 引入库文件
const { parser } = require("./dist/parser");

// 定义输入与输出目录
let inputDir = "./post/**/*.md";
let outputDir = "./public/generate";

// 执行解析
parser(inputDir, outputDir);
```

2、在根目录配置文件 package.json，填写如下内容：

```json
{
  "scripts": {
    "generate": "node generate.js"
  }
}
```

## 应用场景：新建 markdown 文件模版

1、创建一个 JavaScript 文件 create.js，填写如下内容：

```js
// 引入库文件
const { createMardownFile } = require("./dist/parser");

// 获取命令行参数
let argv = process.argv.slice(2);
let [title, dir] = argv;

// 创建文件
createMardownFile(title, dir);
```

2、在根目录配置文件 package.json，填写如下内容：

````json
{
  "scripts": {
    "new": "node create.js $*"
  }
}

3、用户在命令行执行创建操作
语法：
```bash
npm run new [title] [dirname]
````

说明：
title 表示文章题目，必填。
dirname 表示文章目录，默认为./post/tech，选填。

示例：

```bash
npm run new 文章标题 ./post
```
