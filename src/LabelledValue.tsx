import React from 'react';
import './App.css';
import NumericInput, {BoundsFunctionProp} from 'react-numeric-input';

interface State {
    value: number
}

interface Props {
    label: string,
    value: number,
    onChange?: (newValue: number) => void,
    readonly?: boolean,
    format?: (value: number) => string,
    parse?: (value: string) => number,
    max?: BoundsFunctionProp,
    min?: BoundsFunctionProp,
    step?: number | ((component: NumericInput, direction: string) => number | undefined),
}

class LabelledValue extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = props;
    }

    formatValue(value: number| null): string {
        if (this.props.format && value) {
            return this.props.format(value);
        }

        if (value == null) return "";
        return value.toString();
    }

    parseValue(value: string| null): number | null {
        if (this.props.parse && value) {
            return this.props.parse(value);
        }
        if (value == null) return null;
        return parseFloat(value);
    }

    valueDidChange(value: number | null) {
        if (value == null) { return }
        this.setState({ value });

        if (this.props.onChange == null) {return}
        this.props.onChange(value);
    }

    public render() {
        return (
            <div className="row">
                <div className="col-auto"><p>{this.props.label}</p></div>
                <div className="col-auto">
                <NumericInput
                    readOnly={this.props.readonly ? true : false}
                    onChange={this.valueDidChange.bind(this)}
                    format={this.formatValue.bind(this)}
                    parse={this.parseValue.bind(this)}
                    precision={2}
                    value={this.props.value}
                    max={this.props.max}
                    min={this.props.min}
                    step={this.props.step}
                />
                </div>
            </div>
        )
    }
}

export default LabelledValue;
