import React, {FormEvent} from 'react';
import './App.css';
import NumericInput from "react-numeric-input";

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
    max?: NumericInput.BoundsFunctionProp,
    min?: NumericInput.BoundsFunctionProp,
    step?: number | undefined,
}

class LabelledValue extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = props;
    }

    formatValue(possibleValue: number| null): string {
        const value = possibleValue || this.state.value;
        if (value == null) return ""; // This should only happen in the initial state

        if (this.props.format) {
            return this.props.format(value);
        }
        return value.toString();
    }

    parseValue(value: string): number {
        if (this.props.parse && value) {
            return this.props.parse(value);
        }
        return 0;
    }

    valueDidChange(event: FormEvent<HTMLInputElement>) {
        if (event.currentTarget.value != null) return;

        const value = this.parseValue(event.currentTarget.value);

        this.setState({ value });

        if (this.props.onChange == null) {return}
        this.props.onChange(value);
    }

    public render() {
        return (
            <div className="row mb-sm-4 mb-md-0">
                <div className="col-sm-auto col-md-12">
                    <p className="mb-0">{this.props.label}</p>
                </div>
                <div className="col-sm-auto col-12">
                    <NumericInput
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        precision={2}
                        value={this.props.value}
                        format={this.formatValue.bind(this)}
                        parse={this.parseValue.bind(this)}
                        onInput={this.valueDidChange.bind(this)}
                        readOnly={this.props.readonly ? true : false}
                    />
                </div>
            </div>
        )
    }
}

export default LabelledValue;
