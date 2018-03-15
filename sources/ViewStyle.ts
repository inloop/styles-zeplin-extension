import { IContext, ILayer, IProject, IColor } from './Interfaces';
import { normalize, uicolor } from "./Utils";

class ViewStyle {
    private layer: ILayer
    private project: IProject
    private props: string[]
    private name: string

    constructor(layer: ILayer, context: IContext) {
        this.layer = layer;
        this.project = context.project;
        this.props = [];
        this.name = normalize(layer.name);
    }

    generate() {
        this.generateCornerRadius();
        this.generateFill();
        this.generateOpacity();
        this.generateBorders();
        this.generateShadow();

        if (this.props.length == 0) {
            return;
        }
        return `let ` + this.name + ` = ViewStyle(\n\t` + this.props.join(',\n\t') + `\n)`;
    }

    private generateCornerRadius() {
        if (!this.layer.borderRadius) {
            return
        }
        this.props.push(`.cornerRadius(` + this.layer.borderRadius + `)`);
    }

    private generateFill() {
        let fill = this.layer.fills[0];
        if (!fill) {
            return;
        }

        let color = fill.color;
        let colorString = `.backgroundColor(` + uicolor(color, this.project) + `)`;
        this.props.push(colorString);
    }

    private generateOpacity() {
        if (this.layer.opacity === null || this.layer.opacity == 1) {
            return
        }
        this.props.push(`.opacity(` + this.layer.opacity + `)`);
    }

    private generateBorders() {
        // TODO: position
        if (this.layer.borders.length == 0) {
            return;
        }

        let border = this.layer.borders[0];
        this.props.push(`.borderWidth(` + border.thickness + `)`);
        this.props.push(`.borderColor(` + uicolor(border.fill.color, this.project) + `)`);
    }

    private generateShadow() {
        if (this.layer.shadows.length == 0) {
            return;
        }

        let shadow = this.layer.shadows[0];
        let shadowName = this.name + `Shadow`;
        var shadowString = `Shadow(\n\t\tcolor: `
            + uicolor(shadow.color, this.project)
            + `,\n\t\toffset: UIOffset(horizontal: ` + shadow.offsetX + `, vertical: ` + shadow.offsetY + `)`
            + `,\n\t\tradius: ` + shadow.blurRadius
            + `\n\t)`;
        this.props.push(`.shadow(` + shadowString + `)`);
    }
}

export default ViewStyle;