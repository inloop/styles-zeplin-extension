"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interfaces_1 = require("./Interfaces");
var Utils_1 = require("./Utils");
var TextStyle = /** @class */ (function () {
    function TextStyle(rangedTextStyle, layer, project, index) {
        this.props = [];
        this.textStyle = rangedTextStyle.textStyle;
        this.layer = layer;
        this.project = project;
        this.generateName(index);
    }
    TextStyle.prototype.generate = function () {
        this.generateForegroundColor();
        this.generateFont();
        this.generateParagraphStyle();
        var propsString = this.props.join(",\n\t");
        return "let " + this.name + " = TextStyle(\n\t" + propsString + "\n)";
    };
    TextStyle.prototype.generateName = function (index) {
        var name;
        var namedTextStyle = this.project.findTextStyleEqual(this.textStyle);
        if (namedTextStyle) {
            name = Utils_1.normalize(namedTextStyle.name, "text");
        }
        else {
            name = Utils_1.normalize(this.layer.name, "text", index.toString());
        }
        this.name = name;
    };
    TextStyle.prototype.generateFont = function () {
        var fontName = this.textStyle.fontFace;
        var size = this.textStyle.fontSize;
        var font = ".font(UIFont(name: \"" + fontName + "\", size: " + size + "))";
        this.props.push(font);
    };
    TextStyle.prototype.generateParagraphStyle = function () {
        var properties = [
            this.alignment,
            this.lineHeight
        ].filter(Utils_1.notEmpty);
        var style = ".paragraphStyle([\n\t\t" + properties.join("\n\t\t") + "\n\t])";
        this.props.push(style);
    };
    Object.defineProperty(TextStyle.prototype, "lineHeight", {
        get: function () {
            if (!this.textStyle.lineHeight) {
                return null;
            }
            return ".lineHeight(" + this.textStyle.lineHeight + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextStyle.prototype, "alignment", {
        get: function () {
            var alignment;
            switch (this.textStyle.textAlign) {
                case Interfaces_1.TextAlign.left:
                    alignment = ".left";
                    break;
                case Interfaces_1.TextAlign.right:
                    alignment = ".right";
                    break;
                case Interfaces_1.TextAlign.center:
                    alignment = ".center";
                    break;
                case Interfaces_1.TextAlign.justify:
                    alignment = ".justified";
                    break;
            }
            return ".alignment(" + alignment + ")";
        },
        enumerable: true,
        configurable: true
    });
    TextStyle.prototype.generateForegroundColor = function () {
        var color = ".foregroundColor(" + Utils_1.uicolor(this.textStyle.color, this.project) + ")";
        this.props.push(color);
    };
    return TextStyle;
}());
exports.default = TextStyle;
