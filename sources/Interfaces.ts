export interface IStringConvertible {
    toString(): string
}

export interface IColor {
    name: string
    r, g, b, a: number
}

export enum FillType {
    color = "color",
    gradient = "gradient"
}

export interface IFill {
    type: FillType
    color: IColor
    gradient: any
    opacity: number
    blendMode: any
    fill: number
}

export enum BorderPosition {
    center = "center",
    inside = "inside",
    outside = "outside"
}

export interface IBorder {
    position: BorderPosition
    thickness: number
    fill: IFill
}

export enum ShadowType {
    outer = "outer",
    inner = "inner"
}

export interface IShadow {
    type: ShadowType
    offsetX: string
    offsetY: string
    blurRadius: number
    spread: number
    color: IColor
}

export enum LayerType {
    text = "text",
    shape = "shape"
}

export interface ILayer {
    borders: IBorder[]
    fills: IFill[]
    shadows: IShadow[]
    textStyles: IRangedTextStyle[]
    type: LayerType
    name: string
    exportable: boolean
    rotation: number
    opacity: number
    blendMode: any
    borderRadius: number
    blur: number
    rect: any
    content: string
    assets: any[]
}

export enum TextAlign {
    left = "left",
    right = "right",
    center = "center",
    justify = "justify"
}

export interface ITextStyle {
    name: string
    fontFace: string
    fontSize: number
    fontWeight: number
    fontStyle: string
    fontFamily: string
    fontStretch: string
    lineHeight: number
    textAlign: TextAlign
    letterSpacing: number
    color: IColor
    weightText: string

    equals(other: ITextStyle): boolean
}

export interface IProject {
    type: string
    name: string
    textStyles: ITextStyle[]
    colors: IColor[]
    density: string
    densityDivisor: number
    lengthUnit: string
    textLengthUnit: string

    findTextStyleByName(name: string): ITextStyle
    findTextStyleEqual(textStyle: ITextStyle): ITextStyle
    findColorByName(name: string): IColor
    findColorEqual(color: IColor): IColor
}

export interface IContext {
    project: IProject

    getOption(name: string): any
}

export interface IRange {
    start: number
    end: number
}

export interface IRangedTextStyle {
    range: IRange
    textStyle: ITextStyle
}
