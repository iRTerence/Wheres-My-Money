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
                            0,
                            0,
                            0,
                            0,
                            9,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
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
        // console.log(this.props.budget)
    }

    generateCategorySum = async () => {
        console.log('start' + this.props.transactions)
        var sums = {}, obj, i;
        for (i = 0; i < this.props.transactions.length; i++){
            obj = this.props.transactions[i];
            console.log(obj)
            if (!sums[obj.category]) {
                sums[obj.category] = 0;
            }
            sums[obj.category] += +obj.price;
        }
        var newState = this.state.chartData.datasets[0].data
        newState = [sums.Housing, sums.Transportation, sums.Food, sums.Utilities, sums.Insurance, sums.Health, sums.Debt, sums.Personal, sums.Recreation, sums.Misc, sums.Budget]
        console.log(newState)
        this.setState(newState)
        // console.log(sums)
        return sums
      }


    async componentDidMount(){
       await this.generateCategorySum()
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