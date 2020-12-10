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
                            400,
                            123,
                            456,
                            321,
                            896,
                            238,
                            421,
                            368,
                            111,
                            401,
                            212,
                            
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