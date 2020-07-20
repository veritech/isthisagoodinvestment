import React from "react";
import {DataPoint} from "./App";

interface Props {
    data: DataPoint[],
    format: (v: number) => string
}

interface State {
    
}

type ValueReader =  (data: DataPoint) => number;

class AssetTable extends React.Component<Props, State> {

    dataSeries(valueReader: ValueReader): number[] {
        const indexes = new Set<number>([0,2,4,9,24]);

        return this.props.data
            .filter((value, index) => indexes.has(index))
            .map( (value, index) => valueReader(value));
    }

    render() {
        return (
            <table className="table table-bordered table-sm">
                <tr>
                    <th>Asset</th>
                    <th>Year 1</th>
                    <th>Year 3</th>
                    <th>Year 5</th>
                    <th>Year 10</th>
                    <th>Year 25</th>
                </tr>
                <tr>
                    <td>Global Equity</td>
                    { this.dataSeries(v => v.globalEquity).map( v => {
                        return <td>{ this.props.format(v) }</td>
                    })}
                </tr>
                <tr>
                    <td>Gilts</td>
                    { this.dataSeries(v => v.gilts).map( v => {
                        return <td>{ this.props.format(v) }</td>
                    })}
                </tr>
                <tr>
                    <td>Propery Equity</td>
                    { this.dataSeries(v => v.propertyEquity).map( v => {
                        return <td>{ this.props.format(v) }</td>
                    })}
                </tr>
                <tr>
                    <td>Propery Income</td>
                    { this.dataSeries(v => v.propertyRetainedEarnings).map( v => {
                        return <td>{ this.props.format(v) }</td>
                    })}
                </tr>
            </table>
        );
    }
}

export default AssetTable;
