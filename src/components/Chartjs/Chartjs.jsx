import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class Chartjs extends Component {
    constructor(props){
        super(props)
        this.state = {
            chartData: {
                labels: [ 'Housing', 'Transportation', 'Food', 'Utilities', 'Insurance',
                'Health', 'Debt', 'Personal Spending', 'Recreation', 'Misc', 'Remaining Budget'
                ],
                datasets: [
                    {
                        label: 'Budget',
                        data:[
                            this.props.totals.Housing,
                            this.props.totals.Transportation,
                            this.props.totals.Food,
                            this.props.totals.Utilities,
                            this.props.totals.Insurance,
                            this.props.totals.Health,
                            this.props.totals.Debt,
                            this.props.totals.Personal,
                            this.props.totals.Recreation,
                            this.props.totals.Misc,
                            this.props.budget-this.props.expense,
                        ],
                        backgroundColor:[
                            'red',
                            'purple',
                            'black',
                            'yellow',
                            'pink',
                            'blue',
                            'orange',
                            'grey',
                            'silver',
                            'teal',
                            'green'
                        ],
                        borderWidth:1,
                        borderColor:"black",
                        hoverBorderWidth: 4
                    }
                ]
            }
        }
        console.log(this.props.budget)
        // console.log(this.props.expense)
    }



    render() {
        return (
            <div className="chart">
                <Pie
                    data={this.state.chartData}
                    width={500}
                    height={500}
                    options={{
                        maintainAspectRatio: false,
                        title:{
                            display: true,
                            text:'Your Budget Breakdown',
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position:'right',
                            labels:{
                                fontColor: 'black',
                                fontSize: 20,
                            },
                        },
                     }}
                />
            </div>
        );
    }
}

export default Chartjs;