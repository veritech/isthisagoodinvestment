import React from 'react';
import './App.css';
import {CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import LabelledValue from "./LabelledValue";
import AssetTable from "./AssetTable";
import {AssetDetails} from "./AssetDetails";

export interface DataPoint {
    name: string,
    globalEquity: number,
    propertyEquity: number,
    propertyRetainedEarnings: number,
    propertyTotalReturn: number,
    gilts: number,
}

// https://www.msci.com/documents/10199/4753a237-7f5a-4ef6-9f2b-9f46245402e6
// AWCI return over last 10yr
const VANGUARD_FUND_URL = "https://www.vanguardinvestor.co.uk/investments/vanguard-ftse-global-all-cap-index-fund-gbp-acc/overview";
const VANGUARD_FEES = 0.005;
const VANGUARD_FUND_RETURN = 0.067 - VANGUARD_FEES;

// GOLD return over last 10yr
// https://dqydj.com/inflation-adjusted-gold-return-calculator/
const GILT_RETURN = 0.03;

interface Property {
    value: number,
    rent: number,
    deposit: number,
}

interface State {
    data: DataPoint[],
    legalCosts: number,
    mortgageFees: number,
    mortgageRate: number,
    agentFees: number,
    maintenance: number,
    propertyValue: number,
    propertyRent: number,
    propertyDeposit: number,
    housePriceGrowth: number,
}

interface Props {

}

class App extends React.Component<Props, State> {

    private currencyFormatter: Intl.NumberFormat;
    private percentFormatter: Intl.NumberFormat;

    constructor(props: Props) {
        super(props);

        this.percentFormatter = new Intl.NumberFormat('en-gb', {
            style: 'percent',
            maximumFractionDigits: 2
        });

        this.currencyFormatter = new Intl.NumberFormat('en-gb', {
            style: 'currency',
            currency: 'GBP'
        });

        /// Initial values
        this.state = {
            data: [],
            legalCosts: 1000,
            mortgageFees: 1000,
            mortgageRate: 0.0315,
            agentFees: 0.08,
            maintenance: 0.1,
            housePriceGrowth: 0.02,
            propertyValue: 80750,
            propertyRent: 575,
            propertyDeposit: 0.25,
        }
    }

    /// https://www.gov.uk/stamp-duty-land-tax/residential-property-rates
    stampDuty(): number {
        var remainingValue = this.state.propertyValue;
        var duty = 0;

        const TOP = 1500000;
        const MID = 925000;
        const BOTTOM = 250000;

        if (remainingValue > TOP) {
            const tier = remainingValue - TOP;
            remainingValue = TOP;
            duty += tier * 0.15;
        }

        if (remainingValue > MID) {
            const tier = remainingValue - MID;
            remainingValue = MID;
            duty += tier * 0.13;
        }

        if (remainingValue > BOTTOM) {
            const tier = remainingValue - BOTTOM;
            remainingValue = BOTTOM;
            duty += tier * 0.08;
        }

        if (remainingValue > 0) {
            duty += remainingValue * 0.03;
        }

        return duty;
    }

    initialInvestment(): number {
        return this.state.propertyValue * this.state.propertyDeposit;
    }

    totalDebt(): number {
        return this.state.propertyValue * (1 - this.state.propertyDeposit);
    }

    annualIncomeAfterExpenses(): number {
        /// rent
        var annualRentalIncome = this.state.propertyRent * 12;
        /// minus ongoing costs
        annualRentalIncome -= (annualRentalIncome * this.state.agentFees);
        annualRentalIncome -= this.state.mortgageRate * this.totalDebt();
        annualRentalIncome -= (this.state.propertyRent * 12) * this.state.maintenance;
        return annualRentalIncome
    }

    roi(): number {
        return this.annualIncomeAfterExpenses() / this.initialInvestmentPlusPurchaseCosts();
    }

    grossYield(): number {
        return (this.state.propertyRent * 12) / this.state.propertyValue;
    }

    netYield(): number {
        return this.annualIncomeAfterExpenses() / this.state.propertyValue;
    }

    purchaseCosts(): number {
        return this.stampDuty() + this.state.mortgageFees + this.state.legalCosts;
    }

    initialInvestmentPlusPurchaseCosts(): number {
        return this.initialInvestment() + this.purchaseCosts();
    }

    dataPoints(): DataPoint[] {
        let data: DataPoint[] = [];

        /// Initial deposit
        var globalEquity = this.initialInvestment();
        var propertyValue = this.state.propertyValue;
        var giltsValue = this.initialInvestment();
        /// Outstanding debt
        var debt = this.totalDebt();

        /// One off Purchase costs
        var purchaseCosts = this.purchaseCosts();
        var propertyRetainedEarnings = 0;

        for (var i = 0; i < 25; i++) {

            const propertyEquity = (propertyValue - purchaseCosts - debt);
            data.push({
                name: "Year " + (i + 1),
                propertyEquity,
                propertyRetainedEarnings,
                propertyTotalReturn: propertyRetainedEarnings + propertyEquity,
                gilts: giltsValue,
                globalEquity,
            });

            giltsValue = giltsValue * (GILT_RETURN + 1);
            propertyValue = propertyValue * (this.state.housePriceGrowth + 1);
            propertyRetainedEarnings += this.annualIncomeAfterExpenses();
            globalEquity = globalEquity * (VANGUARD_FUND_RETURN + 1);
        }

        return data;
    }

    currencyFormat(value: number | null): string {
        if (value == null) return "";
        return this.currencyFormatter.format(value);
    }

    percentFormat(value: number | null): string {
        if (value == null) return "";
        return this.percentFormatter.format(value);
    }

    percentParse(value: string): number {
        const v = value.replace(/\%$/,"");
        const numericValue =  parseFloat(v);
        // Crappy hack to stop the percentages breaking
        if (numericValue > 1.0) {
            return numericValue / 100;
        }
        return numericValue;
    }

    currencyParse(value: string): number {
        const stripped = value.replace(/^\£/, "")
            .replace(/\,/,"");
        return parseFloat(stripped);
    }

    render() {
        const dataPoints = this.dataPoints();
        return (
            <div className="container ">
                <div className="row jumbotron">
                    <div className="col-12">
                        <h1>Is this a good investment?</h1>
                        <small>Calculate whether an investment property is a good investment relative to others</small>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-4 mb-4">
                        <h4>Basics</h4>
                        <LabelledValue
                            label="Property Value"
                            value={this.state.propertyValue}
                            format={this.currencyFormat.bind(this)}
                            parse={this.currencyParse.bind(this)}
                            onChange={v => {
                                this.setState({propertyValue: v})
                            }}
                        />
                        <LabelledValue
                            label="Deposit (% of property value)"
                            value={this.state.propertyDeposit}
                            format={this.percentFormat.bind(this)}
                            parse={this.percentParse.bind(this)}
                            min={0}
                            max={1.0}
                            step={0.01}
                            onChange={v => {
                                console.log(v);
                                this.setState({propertyDeposit: v})
                            }}
                        />
                        <LabelledValue
                            label="Monthly Rental"
                            value={this.state.propertyRent}
                            format={this.currencyFormat.bind(this)}
                            parse={this.currencyParse.bind(this)}
                            onChange={v => {
                                this.setState({propertyRent: v})
                            }}
                        />
                        <LabelledValue
                            label="Annual House price growth"
                            value={this.state.housePriceGrowth}
                            format={this.percentFormat.bind(this)}
                            parse={this.percentParse.bind(this)}
                            min={0}
                            max={1.0}
                            step={0.01}
                            onChange={v => {
                                this.setState({housePriceGrowth: v})
                            }}
                        />
                    </div>
                    <div className="col-sm-12 col-md-4 mb-4">
                        <h4>Transaction Expenses</h4>
                        <LabelledValue
                            label="Stamp Duty"
                            value={this.stampDuty()}
                            format={this.currencyFormat.bind(this)}
                            parse={this.currencyParse.bind(this)}
                            readonly={true}
                        />
                        <LabelledValue
                            label="Legal costs"
                            value={this.state.legalCosts}
                            format={this.currencyFormat.bind(this)}
                            parse={this.currencyParse.bind(this)}
                            onChange={v => {
                                this.setState({legalCosts: v})
                            }}
                        />
                        <LabelledValue
                            label="Mortgage Arrangement fees"
                            value={this.state.mortgageFees}
                            format={this.currencyFormat.bind(this)}
                            parse={this.currencyParse.bind(this)}
                            onChange={v => {
                                this.setState({mortgageFees: v})
                            }}
                        />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <h4>Ongoing expenses</h4>
                        <LabelledValue
                            label="Mortgage Interest Rate (%)"
                            value={this.state.mortgageRate}
                            format={this.percentFormat.bind(this)}
                            parse={this.percentParse.bind(this)}
                            min={0}
                            max={1.0}
                            step={0.01}
                            onChange={v => {
                                this.setState({mortgageRate: v})
                            }}
                        />
                        <LabelledValue
                            label="Agent fees (% of rent)"
                            value={this.state.agentFees}
                            format={this.percentFormat.bind(this)}
                            parse={this.percentParse.bind(this)}
                            min={0}
                            max={1.0}
                            step={0.01}
                            onChange={v => {
                                this.setState({agentFees: v})
                            }}
                        />
                        <LabelledValue
                            label="Maintenance (% of rent)"
                            value={this.state.maintenance}
                            format={this.percentFormat.bind(this)}
                            parse={this.percentParse.bind(this)}
                            min={0}
                            max={1.0}
                            step={0.01}
                            onChange={v => {
                                this.setState({maintenance: v})
                            }}
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h3>Summary</h3>
                        <small className="d-block d-md-none jumbotron"><strong>Rotate your device for a more complete summary with tables & graphs!</strong></small>
                    </div>
                </div>
                <AssetDetails
                    percentFormat={this.percentFormat.bind(this)}
                    currencyFormat={this.currencyFormat.bind(this)}
                    grossYield={this.grossYield()}
                    netYield={this.netYield()}
                    roi={this.roi()}
                    annualIncomeAfterExpenses={this.annualIncomeAfterExpenses()}
                    vanguardFundUrl={VANGUARD_FUND_URL}
                    vanguardFundReturn={VANGUARD_FUND_RETURN}
                />
                <div className="row d-none d-sm-block">
                    <div className="col-12">
                        <h4>How does it compare?</h4>
                        <AssetTable
                            format={this.currencyFormat.bind(this)}
                            data={dataPoints}/>
                    </div>
                    <div className="col-12">
                        <ResponsiveContainer width="100%" aspect={2}>
                            <LineChart data={dataPoints}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Legend/>
                                <ReferenceLine y={this.initialInvestment()} label="Initial Investment" strokeDasharray="3 3"/>
                                <Line name="BTL"
                                      dataKey="propertyTotalReturn"
                                      stroke="#F00"
                                      strokeWidth={2}/>
                                <Line name="BTL Equity"
                                      dataKey="propertyEquity"
                                      stroke="#F00"
                                      strokeWidth={1}
                                      opacity={0.2}/>
                                <Line name="BTL Income"
                                      dataKey="propertyRetainedEarnings"
                                      stroke="#900"
                                      opacity={0.2}
                                      strokeWidth={1}/>
                                <Line name="Gilts (UK Bonds)" dataKey="gilts" stroke="#0F0" strokeWidth={2}/>
                                <Line name="Vanguard Global All Cap" dataKey="globalEquity" stroke="#00F"
                                      strokeWidth={2}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
