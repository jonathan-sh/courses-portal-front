import React, {Component} from "react";
import PubSub from 'pubsub-js';
import HighCharts from "highcharts";
import AddFunnel from "highcharts/modules/funnel";
import httpService from './../../../service/HttpService';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';

class Analytical extends Component {

    constructor(props) {
        super(props);
        this.httpService = new httpService();
        this.state = {value: 1, series: []};
    }

    componentWillMount() {
        PubSub.publish('header-label', 'Analises');
        PubSub.subscribe('switch-to-crud', this.fncInCrud);
        this.getChartData();

    }

    getChartData = () => {
        this.httpService.get('/course/analytical/', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status !== 501 && response.status !== 406) {
                    return response.json();
                }
            })
            .then(success => {
                this.setState({series: success});
                this.setChart();
            })
            .catch(error => {
                alert('nopp');
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

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <div>
                {/*<br/>*/}
                {/*<DropDownMenu value={this.state.value}*/}
                {/*onChange={this.handleChange}*/}
                {/*autoWidth={false}*/}
                {/*style={{width:"50%"}}>*/}
                {/*<MenuItem value={1} primaryText="Never" />*/}
                {/*<MenuItem value={2} primaryText="Every Night" />*/}
                {/*<MenuItem value={3} primaryText="Weeknights" />*/}
                {/*<MenuItem value={4} primaryText="Weekends" />*/}
                {/*<MenuItem value={5} primaryText="Weekly" />*/}
                {/*</DropDownMenu>*/}
                {/*<DropDownMenu value={this.state.value}*/}
                {/*onChange={this.handleChange}*/}
                {/*autoWidth={false}*/}
                {/*style={{width:"50%"}}>*/}
                {/*<MenuItem value={1} primaryText="Never" />*/}
                {/*<MenuItem value={2} primaryText="Every Night" />*/}
                {/*<MenuItem value={3} primaryText="Weeknights" />*/}
                {/*<MenuItem value={4} primaryText="Weekends" />*/}
                {/*<MenuItem value={5} primaryText="Weekly" />*/}
                {/*</DropDownMenu>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                <div id="chart">

                </div>

            </div>
        )
    }
}

export default Analytical;