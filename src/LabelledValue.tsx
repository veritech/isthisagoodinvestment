import React from 'react';
import './App.css';

interface State {
    value: number
}

interface Props {
    label: string,
    value: number,
    onChange: (newValue: number) => void | null
}

class LabelledValue extends React.Component<Props, State> {

    valueDidChange(value: string) {
        const convertedValue = parseInt(value)
        if (typeof convertedValue === "number" ) {
            this.setState({value: convertedValue })

            if (typeof this.props.onChange === 'function') {
                this.props.onChange(convertedValue);
            }
        }
    }

    constructor(props: Props) {
        super(props);

        this.state = props;
    }

    public render() {
        return (
            <div>
                <div>{this.props.label}</div>
                <input
                    type="text"
                    name={this.props.label}
                    value={this.state.value}
                    onChange={e => this.valueDidChange(e.target.value)} />
            </div>
        )
    }
}

export default LabelledValue;
