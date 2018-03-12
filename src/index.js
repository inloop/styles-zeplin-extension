/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

'use strict';

String.prototype.toCamelCase = function () {
    return this.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
};

class ViewStyleBuilder {
    constructor() {
        this.props = [];
    }

    addCornerRadius(radius) {
        if (radius === null || radius == 0) { return; }
        this.props.push(`.cornerRadius(${radius})`);
        return this;
    }

    addFills(fills) {
        var _this = this;
        fills.forEach(function (f) {
            _this.props.push(`.backgroundColor(.rgba(${f.color.r}, ${f.color.g}, ${f.color.b}, ${f.color.a}))`);
            _this.props.push(`.opacity(${f.color.a})`);
        });
        return this
    }

    construct(name) {
        return `static let ${name.toCamelCase()} = ViewStyle(\n\t${this.props.join(',\n\t')}\n)`;
    }
}

function layer(context, selectedLayer) {
    return {
        code: viewStyle(selectedLayer),
        language: "swift"
    };
}

function viewStyle(layer) {
    return new ViewStyleBuilder()
        .addCornerRadius(layer.borderRadius)
        .addFills(layer.fills)
        .construct(layer.name);
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
    // styleguideColors,
    styleguideTextStyles,
    // exportStyleguideColors,
    exportStyleguideTextStyles,
    // comment
};