import React, {Component} from "react";
import PubSub from 'pubsub-js';
import HighCharts from "highcharts";
import AddFunnel from "highcharts/modules/funnel";
import HttpService from './../../../service/HttpService';

class Analytical extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 1, series: []};
    }

    componentWillMount() {
        PubSub.publish('header-label', 'Analises');
        PubSub.subscribe('switch-to-crud', this.fncInCrud);
        this.getChartData();

    }

    getChartData = () => {
        HttpService.make().get('/course/analytical/')
            .then(success =>
            {
                this.setState({series: success});
                this.setChart();
            })
            .catch(error =>
            {
                console.log(error);
            });
    };



setChart = () => {
        AddFunnel(HighCharts);
        HighCharts.chart('chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Porcentagem de views por curso'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: this.state.series
        });
    };

    render() {
        return (
            <div>
                <div id="chart">

                </div>

            </div>
        )
    }
}

export default Analytical;