import ViewStyle from './ViewStyle';
import TextStyle from './TextStyle';
import { IContext, ILayer, LayerType, IRangedTextStyle } from './Interfaces';

function layer(context: IContext, selectedLayer: ILayer) {
    let style: string;

    switch (selectedLayer.type) {
        case LayerType.text:
            if (selectedLayer.textStyles.length == 1) {
                style = new TextStyle(
                    selectedLayer.textStyles[0].textStyle,
                    selectedLayer,
                    context.project
                ).toString();
            } else {
                style = selectedLayer.textStyles
                    .map((ranges) => {
                        return ranges.textStyle;
                    })
                    .filter((element, position, array) => {
                        return array.index((e) => { return element.equals(e); }) == position;
                    })
                    .map((textStyle, i) => {
                        return new TextStyle(textStyle, selectedLayer, context.project, i + 1).toString();
                    })
                    .join('\n\n');
            }
            break;
        case LayerType.shape:
            style = new ViewStyle(selectedLayer, context).toString();
            break;
        default:
            const object = {
                "layerType": selectedLayer.type,
                "layer": selectedLayer
            };

            const JSONString = JSON.stringify(object, null, 2);

            return {
                code: JSONString,
                language: "json"
            }
    }

    return {
        code: style,
        language: "swift"
    };
}

export default {
    layer
};