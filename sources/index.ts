import ViewStyle from './ViewStyle';
import {
    IContext,
    ILayer,
    LayerType
} from './Interfaces';
import TextLayer from './TextLayer';

function layer(context: IContext, selectedLayer: ILayer) {
    let style: string;

    switch (selectedLayer.type) {
        case LayerType.text:
            style = new TextLayer(selectedLayer, context).toString();
            break;
        default:
            style = new ViewStyle(selectedLayer, context).toString();
            break;
    }

    return {
        code: style,
        language: "swift"
    };
}

function appendingLayer(input: string, layer: ILayer): string {
    let layerJSON = JSON.stringify(layer, null, 2);
    return input + `\n\n\\ LAYER:\n\n` + layerJSON;
}

export default {
    layer
};