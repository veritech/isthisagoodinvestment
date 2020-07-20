import React from "react";
import {DataPoint} from "./App";

interface Props {
    data: DataPoint[]
}

interface State {
    
}

class AssetTable extends React.Component<Props, State> {
    render() {

        const keys = [
            "globalEquity"
        ];

        return (
            <table>
                <tr>
                    <td>Asset</td>
                    <td>Year 1</td>
                    <td>Year 3</td>
                    <td>Year 5</td>
                    <td>Year 10</td>
                    <td>Year 25</td>
                </tr>
            </table>
        );
    }
}

export default AssetTable;
