"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require("fs");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
var yaml = require("js-yaml");
/**
 *
 *
 * @export 防抖动算法，参考: https://davidwalsh.name/function-debounce
 * @param {*} func
 * @param {number} wait
 * @param {boolean} immediate
 * @returns
 */
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
exports.debounce = debounce;
/**
 *
 *
 * @export 读取文件内容之前，先保证这是一个文件
 * @param {string} file
 * @param {*} cb
 * @returns {void}
 */
function readFileContent(file, cb) {
    if (!file || fs.lstatSync(file).isDirectory()) {
        return null;
    }
    fs.readFile(file, function (err, data) {
        cb(err, file, data && data.toString());
    });
}
exports.readFileContent = readFileContent;
/**
 *
 *
 * @export 写入文件内容之前，先保证这是一个文件
 * @param {string} file
 * @param {string} content
 * @param {*} cb
 */
function writeFileContent(file, content, cb) {
    mkdirp(path.dirname(file), function (err) {
        if (err)
            throw err;
        fs.writeFile(file, content, function (e) {
            cb(e);
        });
    });
}
exports.writeFileContent = writeFileContent;
/**
 *
 *
 * @export 解析markdown文件
 * @param {string} file
 * @returns
 */
function parseMarkdown(file) {
    var obj = {};
    try {
        var fileContent = fs.readFileSync(file, "utf8");
        var splitContent = fileContent.match(/^-{3}[\s\S]+?-{3}/);
        var frontmatter = yaml.safeLoad(splitContent[0].substring(3, splitContent[0].length - 3));
        var content = fileContent.substring(splitContent[0].length).trim();
        var previewMatch = content.match(/[\s\S]+?(<!-- more -->)/);
        var preview = previewMatch === null
            ? ""
            : previewMatch[0].substring(0, previewMatch[0].length - "<!-- more -->".length);
        obj = __assign({}, frontmatter, { content: content, preview: preview });
        // console.log("preview", preview);
    }
    catch (error) {
        console.log(error);
    }
    return obj;
}
exports.parseMarkdown = parseMarkdown;
//# sourceMappingURL=parser.js.map