"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("./utils");
var globby_1 = require("globby");
/**
 *
 * @export 解析函数入口
 * @param {string} inputDir
 * @param {string} outputDir
 */
function parser(inputDir, outputDir, mode) {
    if (mode === void 0) { mode = utils.DETAIL; }
    // 1 获取文件列表
    globby_1.default([inputDir]).then(function (files) {
        var fileMap = {};
        files.map(function (item) {
            // 2 计算创建文件列表
            var newFile = item.replace("./post/", outputDir + "/");
            newFile = newFile.replace(".md", ".json");
            // 3 解析单个文件
            var jsonData = utils.parseMarkdown(item);
            // 4 写入创建文件
            utils.writeFileContent(newFile, JSON.stringify(jsonData), function () { });
            if (mode === utils.DETAIL) {
                var sumarry = __rest(jsonData, []);
                fileMap[newFile] = sumarry;
            }
            else {
                var content = jsonData.content, sumarry = __rest(jsonData, ["content"]);
                fileMap[newFile] = sumarry;
            }
        });
        // 5 写入概要文件
        utils.writeFileContent(outputDir + "/summary.json", JSON.stringify({ fileMap: fileMap }), function () { });
    });
}
exports.parser = parser;
/**
 *
 *
 * @export 创建markdown文件
 * @param {string} title 标题
 * @param {string} [dir="./post/tect/"] 路径
 */
function createMardownFile(title, dir) {
    if (dir === void 0) { dir = "./post/tech"; }
    // 1 内容模版
    var content = "---\ntitle: " + title + "\ncreateAt: " + utils.formatDateTime(new Date().toISOString()) + "\nupdateAt: " + utils.formatDateTime(new Date().toISOString()) + "\ntags: \ncategory:\nauthor: \n---\n\n# " + title + "\n\n<!-- more -->\n";
    // 2 写入文件
    try {
        utils.writeFileContent(dir + "/" + title + ".md", content, function () { });
    }
    catch (error) {
        console.log(error);
    }
}
exports.createMardownFile = createMardownFile;
//# sourceMappingURL=index.js.map