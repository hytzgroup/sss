import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initPie = (sender) => {
            sender.dataLabel.content = "{value}%";
        };
        this.state = {
            data: getData(),
            titles: ['Q1', 'Q2', 'Q3', 'Q4'],
            palette: ['rgba(136, 189, 230, 1)', 'rgba(251, 178, 88,1)', 'rgba(144, 205, 151, 1)', 'rgba(246, 170, 201, 1)', 'rgba(191, 165, 84, 1)', 'rgba(188, 153, 199, 1)']
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexPie header="Market Share By Quarter 2017" bindingName="brand" binding="2017Q1,2017Q2,2017Q3,2017Q4" initialized={this.initPie} itemsSource={this.state.data} titles={this.state.titles} palette={this.state.palette}>
                <wjChart.FlexPieDataLabel position="Inside"></wjChart.FlexPieDataLabel>
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
            </wjChart.FlexPie>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
