import camelCase = require('mout/string/camelCase');
import * as Interfaces from './Interfaces';

class ViewStyle {
    layer: Interfaces.ILayer
    project: Interfaces.IProject
    props: string[]
    name: string

    constructor(layer: Interfaces.ILayer, context: Interfaces.IContext) {
        this.layer = layer;
        this.project = context.project;
        this.props = [];
        this.name = camelCase(layer.name);
    }

    generate() {
        this.generateCornerRadius();
        this.generateFill();
        this.generateOpacity();
        this.generateBorders();

        if (this.props.length == 0) {
            return;
        }
        return "let " + this.name + " = ViewStyle(\n\t" + this.props.join(',\n\t') + "\n)";
    }

    private generateCornerRadius() {
        if (!this.layer.borderRadius) {
            return
        }
        this.props.push(".cornerRadius(" + this.layer.borderRadius + ")");
    }

    private generateFill() {
        let fill = this.layer.fills[0];
        if (!fill) {
            return;
        }

        let color = fill.color;
        let colorString = ".backgroundColor(" + this.uicolor(color) + ")";
        this.props.push(colorString);
    }

    private uicolor(color: Interfaces.IColor): string {
        let namedColor = this.project.findColorEqual(color);
        let colorString: string;

        if (namedColor && namedColor.name) {
            colorString = "." + namedColor.name
        }
        else {
            colorString = ".rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
        }
        return colorString
    }

    private generateOpacity() {
        if (this.layer.opacity === null || this.layer.opacity == 1) {
            return
        }
        this.props.push(".opacity(" + this.layer.opacity + ")");
    }

    private generateBorders() {
        // TODO: position
        if (this.layer.borders.length == 0) {
            return;
        }

        let border = this.layer.borders[0];
        this.props.push(".borderWidth(" + border.thickness + ")");
        this.props.push(".borderColor(" + this.uicolor(border.fill.color) + ")");
    }
}

export default ViewStyle;