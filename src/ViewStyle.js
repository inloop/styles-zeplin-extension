"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelCase = require("mout/string/camelCase");
var ViewStyle = /** @class */ (function () {
    function ViewStyle(layer, context) {
        this.layer = layer;
        this.project = context.project;
        this.props = [];
        this.name = camelCase(layer.name);
    }
    ViewStyle.prototype.generate = function () {
        this.generateCornerRadius();
        this.generateFill();
        this.generateOpacity();
        this.generateBorders();
        this.generateShadow();
        if (this.props.length == 0) {
            return;
        }
        return "let " + this.name + " = ViewStyle(\n\t" + this.props.join(',\n\t') + "\n)";
    };
    ViewStyle.prototype.generateCornerRadius = function () {
        if (!this.layer.borderRadius) {
            return;
        }
        this.props.push(".cornerRadius(" + this.layer.borderRadius + ")");
    };
    ViewStyle.prototype.generateFill = function () {
        var fill = this.layer.fills[0];
        if (!fill) {
            return;
        }
        var color = fill.color;
        var colorString = ".backgroundColor(" + this.uicolor(color) + ")";
        this.props.push(colorString);
    };
    ViewStyle.prototype.uicolor = function (color) {
        var namedColor = this.project.findColorEqual(color);
        var colorString;
        if (namedColor && namedColor.name) {
            colorString = "." + namedColor.name;
        }
        else {
            colorString = ".rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
        }
        return colorString;
    };
    ViewStyle.prototype.generateOpacity = function () {
        if (this.layer.opacity === null || this.layer.opacity == 1) {
            return;
        }
        this.props.push(".opacity(" + this.layer.opacity + ")");
    };
    ViewStyle.prototype.generateBorders = function () {
        // TODO: position
        if (this.layer.borders.length == 0) {
            return;
        }
        var border = this.layer.borders[0];
        this.props.push(".borderWidth(" + border.thickness + ")");
        this.props.push(".borderColor(" + this.uicolor(border.fill.color) + ")");
    };
    ViewStyle.prototype.generateShadow = function () {
        if (this.layer.shadows.length == 0) {
            return;
        }
        var shadow = this.layer.shadows[0];
        var shadowName = this.name + "Shadow";
        var shadowString = "Shadow(\n\t\tcolor: "
            + this.uicolor(shadow.color)
            + ",\n\t\toffset: UIOffset(horizontal: " + shadow.offsetX + ", vertical: " + shadow.offsetY + ")"
            + ",\n\t\tradius: " + shadow.blurRadius
            + "\n\t)";
        this.props.push(".shadow(" + shadowString + ")");
    };
    return ViewStyle;
}());
exports.default = ViewStyle;
