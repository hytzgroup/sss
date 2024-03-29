import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as chart from '@grapecity/wijmo.chart';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.chartInitialized = (sender) => {
            sender.dataLabel.content = "{item.count}";
        };
        this.state = {
            data: getData(),
            palette: (() => {
                // Get random palette
                let palettes = Object.getOwnPropertyNames(chart.Palettes)
                    .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return chart.Palettes[palettes[rand]];
            })()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart bindingX="stage" itemsSource={this.state.data} options={{ funnel: { type: 'rectangle' } }} palette={this.state.palette} chartType="Funnel" initialized={this.chartInitialized}>
                <wjChart.FlexChartSeries binding="count" name="Sales Pipeline"></wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
