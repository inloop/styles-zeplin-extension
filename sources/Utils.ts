///<reference path="Annotations.d.ts" />
import camelCase = require('mout/string/camelCase');
import { IColor, IProject } from './Interfaces';

function isNumeric(input: string): boolean {
    return !isNaN(parseInt(input));
}

export function normalize(input: string, prefix?: string, suffix?: string): string {
    let out: string;

    if (!prefix) {
        prefix = '';
    }
    if (!suffix) {
        suffix = '';
    }

    if (isNumeric(input[0])) {
        out = prefix + input + suffix;
    } else {
        out = input + suffix;
    }
    return camelCase(out);
}

export function uicolor(color: IColor, project: IProject): string {
    let namedColor = project.findColorEqual(color);
    let colorString: string;

    if (namedColor && namedColor.name) {
        colorString = "." + namedColor.name
    } else {
        colorString = ".rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
    }
    return colorString
}

export function notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

Array.prototype.index = function <T>(where: (element: T) => boolean): number {
    for (let i = 0; i < this.length; i++) {
        let element = this[i];
        if (where(element)) {
            return i;
        }
    }
    return null;
}
