import React from 'react';
import './App.css';
import {Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import LabelledValue from "./LabelledValue";

interface DataPoint {
    name: string,
    globalEquity: number,
    propertyEquity: number,
}

// https://www.msci.com/documents/10199/4753a237-7f5a-4ef6-9f2b-9f46245402e6
// AWCI return over last 10yr
const VANGUARD_FEES = 0.005;
const MSCI_AWCI_RETURN = 0.0974 - VANGUARD_FEES;

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


    constructor(props: Props) {
        super(props);

        // useState();


        /// Initial values
        this.state = {
            data: [],
            legalCosts: 1000,
            mortgageFees: 1000,
            mortgageRate: 0.025,
            agentFees: 0.08,
            maintenance: 0.1,
            housePriceGrowth: 0.02,
            propertyValue: 80750,
            propertyRent: 575,
            propertyDeposit: 0.25,
        }
    }

    stampDuty(): number {
        var duty = 0;
        if (this.state.propertyValue > 500000) {
            duty += (this.state.propertyValue - 500000) * 0.05;
        } else {
            duty += this.state.propertyValue * 0.03;
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

    grossYield(): number {
        return 0;
    }

    generateData(): DataPoint[] {
        let data: DataPoint[] = [];

        /// Initial deposit
        var globalEquity = this.initialInvestment();
        var propertyValue = this.state.propertyValue;

        /// Outstanding debt
        var debt = this.totalDebt();

        const annualRentalIncome = this.annualIncomeAfterExpenses();
        /// One off Purchase costs
        var purchaseCosts = this.stampDuty() + this.state.mortgageFees;

        console.log("values", propertyValue, debt, purchaseCosts, annualRentalIncome);

        for (var i = 0; i < 25; i++) {
            data.push({
                name: "Year " + (i + 1),
                propertyEquity: (propertyValue - purchaseCosts - debt),
                globalEquity,
            });

            propertyValue = propertyValue * (this.state.housePriceGrowth + 1);
            globalEquity = globalEquity * (MSCI_AWCI_RETURN + 1);
        }

        return data;
    }

    render() {
        var data = this.generateData();

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h2>Basics</h2>
                        <LabelledValue
                            label="Property Value"
                            value={this.state.propertyValue}
                            onChange={v => {
                                this.setState({propertyValue: v})
                            }}
                        />
                        <LabelledValue
                            label="Deposit"
                            value={this.state.propertyDeposit}
                            onChange={v => {
                                this.setState({propertyDeposit: v})
                            }}
                        />
                        <LabelledValue
                            label="Monthly Rental"
                            value={this.state.propertyRent}
                            onChange={v => {
                                this.setState({propertyRent: v})
                            }}
                        />
                    </div>
                    <div className="col-sm">
                        <h2>Transaction Expenses</h2>
                        <LabelledValue
                            label="SDLT"
                            value={this.stampDuty()}
                            onChange={v => {
                                this.setState({propertyRent: v})
                            }}
                        />
                        <LabelledValue
                            label="Legal costs"
                            value={this.state.legalCosts}
                            onChange={v => {
                                this.setState({legalCosts: v})
                            }}
                        />
                        <LabelledValue
                            label="Mortgage Arrangement fees"
                            value={this.state.mortgageFees}
                            onChange={v => {
                                this.setState({mortgageFees: v})
                            }}
                        />
                    </div>
                    <div className="col-sm">
                        <h2>Ongoing expenses</h2>
                        <LabelledValue
                            label="Mortgage Interest Rate"
                            value={this.state.mortgageRate}
                            onChange={v => {
                                this.setState({mortgageRate: v})
                            }}
                        />
                        <LabelledValue
                            label="Agent fees"
                            value={this.state.agentFees}
                            onChange={v => {
                                this.setState({agentFees: v})
                            }}
                        />
                        <LabelledValue
                            label="Maintenance"
                            value={this.state.maintenance}
                            onChange={v => {
                                this.setState({maintenance: v})
                            }}
                        />
                    </div>
                    <h1>Return on Investment</h1>
                    <ResponsiveContainer width="100%" aspect={3}>
                        <LineChart data={data}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Legend/>
                            <ReferenceLine y={this.initialInvestment()} label="Break-even" strokeDasharray="3 3"/>
                            <Line name="BTL" dataKey="propertyEquity" stroke="#F00" strokeWidth={2}/>
                            <Line name="MSCI AWCI" dataKey="globalEquity" stroke="#00F" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default App;
