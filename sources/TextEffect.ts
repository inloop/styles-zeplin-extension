import { IRange } from "./Interfaces";

class TextEffect {
    private styleName: string
    private ranges: IRange[]

    constructor(styleName: string, ranges: IRange[]) {
        this.styleName = styleName;
        this.ranges = ranges;
    }

    toString(): string {
        return `TextEffect(\n\tstyle: ` + this.styleName + `,\n\tmatching: Range([\n\t\t` + this.ranges.map(this.rangeString).join(`,\n\t\t`) + `\n\t])\n)`;
    }

    private rangeString(range: IRange): string {
        return `NSRange(location: ` + range.start + `, length: ` + (range.end - range.start) + `)`;
    }
}

export default TextEffect;