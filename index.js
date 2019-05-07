const { parser, createMardownFile } = require("./dist/index");

let inputDir = "./post/**/*.md";
let outputDir = "./public/generate";
// parser(inputDir, outputDir, "detail");

console.log("arguments: " + process.argv.slice(2));
let argv = process.argv.slice(2);
let [title, dir] = argv;
createMardownFile(title, dir);
