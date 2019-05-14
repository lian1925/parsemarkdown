"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
// 测试创建文件
index_1.createMardownFile("one", "./pos//");
// 测试解析文件
var inputDir = "./post/**/*.md";
var outputDir = "./public/generate";
index_1.parser(inputDir, outputDir);
