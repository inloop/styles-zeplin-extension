import ViewStyle from './ViewStyle';
import TextStyle from './TextStyle';
import { IContext, ILayer, LayerType, IRangedTextStyle } from './Interfaces';

function layer(context: IContext, selectedLayer: ILayer) {
    // return {
    //     code: viewStyle(context, selectedLayer),
    //     language: "swift"
    // };

    let style: string;

    switch (selectedLayer.type) {
        case LayerType.text:
            let styles = selectedLayer.textStyles.map((ranged: IRangedTextStyle, i) => {
                return new TextStyle(ranged, selectedLayer, context.project, i).generate();
            })
            style = styles.join('\n\n');
            break;
        case LayerType.shape:
            style = new ViewStyle(selectedLayer, context).generate();
            break;
        default:
            style = `Unknown layer type: ${selectedLayer.type}`
            break;
    }

    // const object = {
    //     "layer": selectedLayer,
    //     // "context": context,
    //     "code": style,
    //     "function": "layer"
    // };

    // const JSONString = JSON.stringify(object, null, 2);

    return {
        code: style,
        language: "swift"
    };
}

function styleguideColors(context, colors) {

}

function styleguideTextStyles(context, colors) {
    const object = {
        "layerName": colors,
        "projectName": context.project.name,
        "function": "styleguideTextStyle"
    };

    const JSONString = JSON.stringify(object, null, 2);

    return {
        code: JSONString,
        language: "json"
    }
}

function exportStyleguideColors(context, colors) {

}

function exportStyleguideTextStyles(context, colors) {
    const object = {
        "layerName": colors,
        "projectName": context.project.name,
        "function": "exportStyleguideTextStyles"
    };

    const JSONString = JSON.stringify(object, null, 2);

    return {
        code: JSONString,
        language: "json"
    }
}

function comment(context, text) {
    return "Styles Comment !"
}

export default {
    layer,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    comment
};