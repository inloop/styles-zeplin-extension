import {
    IRange,
    IRangedTextStyle,
    ILayer,
    IProject
} from "./Interfaces";
import TextStyle from "./TextStyle";

class RangedTextStyle {
    ranges: IRange[] = [];
    readonly textStyle: TextStyle

    get length(): number {
        return this.ranges.map(r => {
            return r.end - r.start;
        }).reduce((prev, current) => {
            return prev + current;
        });
    }

    constructor(ranged: IRangedTextStyle, layer: ILayer, project: IProject) {
        this.ranges.push(ranged.range);
        this.textStyle = new TextStyle(ranged.textStyle, layer, project);
    }

    toString(): string {
        return this.textStyle.toString();
    }
}

export default RangedTextStyle;