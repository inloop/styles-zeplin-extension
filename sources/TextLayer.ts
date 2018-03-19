import {
    ILayer,
    IRangedTextStyle,
    IRange,
    ITextStyle,
    IContext
} from "./Interfaces";
import TextStyle from "./TextStyle";
import RangedTextStyle from "./RangedTextStyle";
import TextEffect from "./TextEffect";
import { normalize } from "./Utils";

class TextLayer {
    base: RangedTextStyle;
    effects: RangedTextStyle[];

    constructor(layer: ILayer, context: IContext) {
        let lengths: { [style: string]: RangedTextStyle; } = {};
        let textStyles: RangedTextStyle[] = [];
        layer.textStyles.map((s) => {
            return new RangedTextStyle(s, layer, context.project);
        }).forEach(s => this.merge(lengths, s));

        for (let key in lengths) {
            textStyles.push(lengths[key]);
        }
        textStyles.sort((l, r) => {
            return l.length >= r.length ? -1 : 1;
        });
        this.base = textStyles.shift();
        this.effects = textStyles;
    }

    private merge(lengths: { [style: string]: RangedTextStyle; }, style: RangedTextStyle) {
        let key = style.toString();
        if (!lengths[key]) {
            lengths[key] = style;
        } else {
            let prev = lengths[key];
            prev.ranges = prev.ranges.concat(style.ranges);
        }
    }

    toString(): string {
        let str: string = ``;
        let hasEffects = this.effects.length > 0;

        if (hasEffects) {
            str = this.descriptionWithEffects;
        } else {
            str = this.description;
        }
        return str;
    }

    private get description(): string {
        return `let ` + this.generateName(this.base.textStyle) + ` = ` + this.base.toString();
    }

    private generateName(textStyle: TextStyle): string {
        let name: string
        let namedTextStyle = textStyle.project.findTextStyleEqual(textStyle.textStyle);
        if (namedTextStyle) {
            name = normalize(namedTextStyle.name);
        } else {
            name = normalize(textStyle.layer.name, "text");
        }
        return name;
    }

    private get descriptionWithEffects(): string {
        let str: string = ``;

        str += `/* --------------- Styles --------------- */`;

        this.effects.forEach((style, index) => {
            let styleName = `effect` + (index + 1) + `Style`;
            str += `\n\nlet ` + styleName + ` = ` + style.toString();
        });

        str += `\n\n/* --------------- Effects -------------- */`;

        this.effects.map((style, index) => {
            return new TextEffect(`effect` + (index + 1) + `Style`, style.ranges);
        }).forEach((effect, index) => {
            str += `\n\nlet effect` + (index + 1) + ` = ` + effect.toString();
        });

        str += `\n\n/* --------------- Usage ---------------- */`

        this.base.textStyle.addEffectsNames(this.effects.map((e, index) => { return `effect` + (index + 1) }));

        str += `\n\n\let base = ` + this.base.toString();

        return str;
    }
}

export default TextLayer;