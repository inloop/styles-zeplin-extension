import ViewStyle from './ViewStyle';
import TextStyle from './TextStyle';
import { IContext, ILayer, LayerType, IRangedTextStyle } from './Interfaces';

function layer(context: IContext, selectedLayer: ILayer) {
    let style: string;

    switch (selectedLayer.type) {
        case LayerType.text:
            if (selectedLayer.textStyles.length == 1) {
                style = new TextStyle(
                    selectedLayer.textStyles[0],
                    selectedLayer,
                    context.project
                ).generate();
            } else {
                style = selectedLayer.textStyles.map((ranged, i) => {
                    return new TextStyle(ranged, selectedLayer, context.project, i).generate();
                }).join('\n\n');
            }
            break;
        case LayerType.shape:
            style = new ViewStyle(selectedLayer, context).generate();
            break;
        default:
            style = `Unknown layer type: ${selectedLayer.type}`
            break;
    }

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