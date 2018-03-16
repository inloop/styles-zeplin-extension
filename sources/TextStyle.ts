import {
    ITextStyle,
    IRange,
    IProject,
    IRangedTextStyle,
    ILayer,
    TextAlign
} from "./Interfaces";
import { normalize, uicolor, notEmpty } from "./Utils";

class TextStyle {
    private textStyle: ITextStyle;
    private project: IProject;
    private layer: ILayer;
    private name: string;
    private props: string[] = [];

    constructor(textStyle: ITextStyle, layer: ILayer, project: IProject, index?: number) {
        this.textStyle = textStyle;
        this.layer = layer;
        this.project = project;
        this.generateName(index);
        this.generateForegroundColor();
        this.generateFont();
        this.generateParagraphStyle();
    }

    toString(): string {
        if (this.props.length == 0) {
            return null;
        }
        let propsString = this.props.join(`,\n\t`);
        return `let ` + this.name + ` = TextStyle(\n\t` + propsString + `\n)`;
    }

    private generateName(index?: number) {
        let name: string
        let namedTextStyle = this.project.findTextStyleEqual(this.textStyle);
        if (namedTextStyle) {
            name = normalize(namedTextStyle.name, "text");
        } else {
            let suffix: string
            if (index == null) {
                suffix = null;
            } else {
                suffix = index.toString();
            }
            name = normalize(this.layer.name, "text", suffix);
        }
        this.name = name;
    }

    private generateFont() {
        let fontName = this.textStyle.fontFace;
        let size = this.textStyle.fontSize;
        let font = `.font(UIFont(name: "` + fontName + `", size: ` + size + `))`;
        this.props.push(font);
    }

    private generateParagraphStyle() {
        let properties = [
            this.alignment,
            this.lineHeight
        ].filter(notEmpty);

        let style = `.paragraphStyle([\n\t\t` + properties.join(`,\n\t\t`) + `\n\t])`;
        this.props.push(style);
    }

    private get lineHeight(): string {
        if (!this.textStyle.lineHeight) {
            return null;
        }
        return `.lineHeight(` + this.textStyle.lineHeight + `)`;
    }

    private get alignment(): string {
        let alignment: string
        switch (this.textStyle.textAlign) {
            case TextAlign.left:
                alignment = `.left`;
                break;
            case TextAlign.right:
                alignment = `.right`;
                break;
            case TextAlign.center:
                alignment = `.center`;
                break;
            case TextAlign.justify:
                alignment = `.justified`;
                break;
        }

        return `.alignment(` + alignment + `)`;
    }

    private generateForegroundColor() {
        let color = `.foregroundColor(` + uicolor(this.textStyle.color, this.project) + `)`;
        this.props.push(color);
    }
}

export default TextStyle;