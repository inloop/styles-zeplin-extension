"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelCase = require("mout/string/camelCase");
function isNumeric(input) {
    return !isNaN(parseInt(input));
}
function normalize(input, prefix, suffix) {
    var out;
    if (!prefix) {
        prefix = '';
    }
    if (!suffix) {
        suffix = '';
    }
    if (isNumeric(input[0])) {
        out = prefix + input + suffix;
    }
    else {
        out = input + suffix;
    }
    return camelCase(out);
}
exports.normalize = normalize;
function uicolor(color, project) {
    var namedColor = project.findColorEqual(color);
    var colorString;
    if (namedColor && namedColor.name) {
        colorString = "." + namedColor.name;
    }
    else {
        colorString = ".rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
    }
    return colorString;
}
exports.uicolor = uicolor;
function notEmpty(value) {
    return value !== null && value !== undefined;
}
exports.notEmpty = notEmpty;
