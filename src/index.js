"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewStyle_1 = require("./ViewStyle");
var TextStyle_1 = require("./TextStyle");
var Interfaces_1 = require("./Interfaces");
function layer(context, selectedLayer) {
    // return {
    //     code: viewStyle(context, selectedLayer),
    //     language: "swift"
    // };
    var style;
    switch (selectedLayer.type) {
        case Interfaces_1.LayerType.text:
            var styles = selectedLayer.textStyles.map(function (ranged, i) {
                return new TextStyle_1.default(ranged, selectedLayer, context.project, i).generate();
            });
            style = styles.join('\n\n');
            break;
        case Interfaces_1.LayerType.shape:
            style = new ViewStyle_1.default(selectedLayer, context).generate();
            break;
        default:
            style = "Unknown layer type: " + selectedLayer.type;
            break;
    }
    // const object = {
    //     "layer": selectedLayer,
    //     // "context": context,
    //     "code": style,
    //     "function": "layer"
    // };
    // const JSONString = JSON.stringify(object, null, 2);
    return {
        code: style,
        language: "swift"
    };
}
function styleguideColors(context, colors) {
}
function styleguideTextStyles(context, colors) {
    var object = {
        "layerName": colors,
        "projectName": context.project.name,
        "function": "styleguideTextStyle"
    };
    var JSONString = JSON.stringify(object, null, 2);
    return {
        code: JSONString,
        language: "json"
    };
}
function exportStyleguideColors(context, colors) {
}
function exportStyleguideTextStyles(context, colors) {
    var object = {
        "layerName": colors,
        "projectName": context.project.name,
        "function": "exportStyleguideTextStyles"
    };
    var JSONString = JSON.stringify(object, null, 2);
    return {
        code: JSONString,
        language: "json"
    };
}
function comment(context, text) {
    return "Styles Comment !";
}
exports.default = {
    layer: layer,
    styleguideColors: styleguideColors,
    styleguideTextStyles: styleguideTextStyles,
    exportStyleguideColors: exportStyleguideColors,
    exportStyleguideTextStyles: exportStyleguideTextStyles,
    comment: comment
};
