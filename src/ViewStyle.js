"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var ViewStyle = /** @class */ (function () {
    function ViewStyle(layer, context) {
        this.layer = layer;
        this.project = context.project;
        this.props = [];
        this.name = Utils_1.normalize(layer.name);
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
        var colorString = ".backgroundColor(" + Utils_1.uicolor(color, this.project) + ")";
        this.props.push(colorString);
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
        this.props.push(".borderColor(" + Utils_1.uicolor(border.fill.color, this.project) + ")");
    };
    ViewStyle.prototype.generateShadow = function () {
        if (this.layer.shadows.length == 0) {
            return;
        }
        var shadow = this.layer.shadows[0];
        var shadowName = this.name + "Shadow";
        var shadowString = "Shadow(\n\t\tcolor: "
            + Utils_1.uicolor(shadow.color, this.project)
            + ",\n\t\toffset: UIOffset(horizontal: " + shadow.offsetX + ", vertical: " + shadow.offsetY + ")"
            + ",\n\t\tradius: " + shadow.blurRadius
            + "\n\t)";
        this.props.push(".shadow(" + shadowString + ")");
    };
    return ViewStyle;
}());
exports.default = ViewStyle;
