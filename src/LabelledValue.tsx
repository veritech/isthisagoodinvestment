import React from 'react';
import './App.css';
import InputNumber from 'rc-input-number';

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
    max?: number,
    min?: number,
    step?: string | number | undefined,
}

class LabelledValue extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = props;
    }

    formatValue(value: string| number| undefined): string {
        if (value === undefined) return "";

        if (this.props.format) {
            if (typeof value == "number") {
                return this.props.format(value);
            } else {
                return this.props.format(this.parseValue(value));
            }
        }

        return value.toString();
    }

    parseValue(value: string| undefined): number {
        if (this.props.parse && value) {
            return this.props.parse(value);
        }
        if (value == null) return 0;
        return parseFloat(value);
    }

    valueDidChange(value: string | number | undefined) {
        if (typeof value != "number") { return }
        this.setState({ value });

        if (this.props.onChange == null) {return}
        this.props.onChange(value);
    }

    public render() {
        return (
            <div className="row">
                <div className="col-auto"><p>{this.props.label}</p></div>
                <div className="col-auto">
                    <InputNumber
                        step={this.props.step}
                        min={this.props.min}
                        max={this.props.max}
                        precision={2}
                        value={this.props.value}
                        formatter={this.formatValue.bind(this)}
                        parser={this.parseValue.bind(this)}
                        onChange={this.valueDidChange.bind(this)}
                        readOnly={this.props.readonly ? true : false}
                    />
                </div>
            </div>
        )
    }
}

export default LabelledValue;
