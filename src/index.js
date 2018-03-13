/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

'use strict';

var camelCase = require('mout/string/camelCase');

class ViewStyleBuilder {
    constructor(context, layer) {
        this.project = context.project;
        this.layer = layer;
        this.name = camelCase(layer.name);
        this.props = [];
    }

    addCornerRadius() {
        if (!this.layer.borderRadius) { return this; }
        this.props.push(`.cornerRadius(${this.layer.borderRadius})`);
        return this;
    }

    addFills() {
        var fill = this.layer.fills[0];

        if (!fill) {
            return this;
        }

        this.addBackgroundColor(fill.color);

        return this;
    }

    addBackgroundColor(color) {
        var namedColor = this.project.findColorEqual(color);
        if (namedColor && namedColor.name) {
            this.props.push(`.backgroundColor(.${namedColor.name})`);
        } else {
            this.props.push(`.backgroundColor(.rgba(${color.r}, ${color.g}, ${color.b}, ${color.a}))`);
        }
    }

    addOpacity() {
        if (this.layer.opacity == 1) { return this; }
        this.props.push(`.opacity(${this.layer.opacity})`);
        return this;
    }

    construct() {
        if (this.props.length == 0) { return; }
        return `static let ${this.name} = ViewStyle(\n\t${this.props.join(',\n\t')}\n)`;
    }
}

function layer(context, selectedLayer) {
    // return {
    //     code: viewStyle(context, selectedLayer),
    //     language: "swift"
    // };

    var style;

    switch (selectedLayer.type) {
        case "text":
            style = "TODO: text layer";
            break;
        case "shape":
            style = viewStyle(context, selectedLayer);
            break;
        default:
            style = `Unknown layer type: ${selectedLayer.type}`
            break;
    }

    const object = {
        "layer": selectedLayer,
        // "context": context,
        "code": style,
        "function": "layer"
    };

    const JSONString = JSON.stringify(object, null, 2);

    return {
        code: JSONString,
        language: "json"
    };
}

function viewStyle(context, layer) {
    return new ViewStyleBuilder(context, layer)
        .addCornerRadius()
        .addFills()
        .addOpacity()
        .construct();
}

function styleguideColors(context, colors) {

}

function styleguideTextStyles(context, colors) {
    const object = {
        "layerName": layer.name,
        "projectName": context.project.name,
        "function": "styleguideTextStyle"
    };

    const JSONString = JSON.stringify(object, null, 2);

    return {
        code: JSONString,
        language: "json"
    }
}

function exportStyleguideColors(context, colors) {

}

function exportStyleguideTextStyles(context, colors) {
    const object = {
        "layerName": layer.name,
        "projectName": context.project.name,
        "function": "exportStyleguideTextStyles"
    };

    const JSONString = JSON.stringify(object, null, 2);

    return {
        code: JSONString,
        language: "json"
    }
}

function comment(context, text) {
    return "Styles Comment"
}

export default {
    layer,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    comment
};