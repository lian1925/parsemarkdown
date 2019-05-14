import { createMardownFile, parser } from "./index";

// 测试创建文件
createMardownFile("one", "./pos//");

// 测试解析文件
let inputDir = "./post/**/*.md";
let outputDir = "./public/generate";

parser(inputDir, outputDir);
