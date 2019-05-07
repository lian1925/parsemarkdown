"use strict";
// 时间与日期相关
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @export 格式化日期
 * @param {string} str
 * @returns
 */
function formatDateTime(str) {
    var date = new Date(str);
    var y = date.getFullYear();
    var m = prefixNumber(date.getMonth() + 1);
    var d = prefixNumber(date.getDate());
    var hour = prefixNumber(date.getHours());
    var minute = prefixNumber(date.getMinutes());
    var second = prefixNumber(date.getSeconds());
    return y + "-" + m + "-" + d + " " + hour + ":" + minute + ":" + second;
}
exports.formatDateTime = formatDateTime;
// 私有方法
/**
 * 将数字截取指定位数
 *
 * @param {number} num
 * @param {number} [length=2]
 * @returns
 */
function prefixNumber(num, length) {
    if (length === void 0) { length = 2; }
    return (Array(length).join("0") + num).slice(-length);
}
exports.prefixNumber = prefixNumber;
//# sourceMappingURL=date.js.map