import React from "react";

interface Props {
    percentFormat?: (value: number) => string
    currencyFormat?: (value: number) => string
    grossYield: number
    netYield: number
    roi: number
    annualIncomeAfterExpenses: number
    vanguardFundUrl: string
    vanguardFundReturn: number
}

interface State {

}

export class AssetDetails extends React.Component<Props, State> {

    percentFormat(value: number): string {
        if (this.props.percentFormat) {
            return this.props.percentFormat(value);
        }
        return value.toString();
    }

    currencyFormat(value: number): string {
        if (this.props.currencyFormat) {
            return this.props.currencyFormat(value);
        }
        return value.toString();
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <h4>Buy to Let</h4>
                    <p>This prospective investment has:</p>
                    <ul>
                        <li>ROI of <strong>{this.percentFormat(this.props.roi)}</strong> (annual return/
                            initial investment)
                        </li>
                        <li>Gross yield of <strong>{this.percentFormat(this.props.grossYield)}</strong>
                        </li>
                        <li>Net yield of <strong>{this.percentFormat(this.props.netYield)}</strong></li>
                    </ul>

                    <p>It would
                        generate <strong>{this.currencyFormat(this.props.annualIncomeAfterExpenses)}/year</strong>,
                        or <strong>{this.currencyFormat(this.props.annualIncomeAfterExpenses / 12)}/month</strong> in
                        profits</p>
                    <p>This model doesn't account for:</p>
                    <ul>
                        <li><strong>Tax</strong></li>
                        <li>Periodic remortgaging costs</li>
                        <li>Periodic agent letting fees (eg. First months rent)</li>
                        <li>Rental Voids</li>
                        <li>Initial remodelling costs if any</li>
                    </ul>
                </div>
                <div className="col-sm-12 col-md-4">
                    <h4>Global Equity</h4>
                    <p>This model assumes that you invest your property deposit in <a href={this.props.vanguardFundUrl}>Vanguard
                        FTSE Global all cap index fund</a>.
                        Specifically the accumulation fund, which will re-invest company dividends</p>
                    <p>It also uses the the annualized growth rate over the last 5 years which
                        is <strong>{this.percentFormat(this.props.vanguardFundReturn)}</strong></p>
                    <p>This model does not account for:</p>
                    <ul>
                        <li>Market crashes</li>
                    </ul>
                </div>
                <div className="col-sm-12 col-md-4">
                    <h4>Gilts</h4>
                    <p>Gilts are debt issued by the UK government to fund itself. While they aren't without risk
                        they form one of the safest forms of investment.</p>
                </div>
            </div>
        )
    }
}
