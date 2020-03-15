import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjCharts from '@grapecity/wijmo.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.getRandomPalette = () => {
            let palettes = Object.getOwnPropertyNames(wjCharts.Palettes)
                .filter(prop => typeof wjCharts.Palettes[prop] === "object" && prop !== 'prototype');
            let rand = Math.floor(Math.random() * palettes.length);
            //
            return wjCharts.Palettes[palettes[rand]];
        };
        this.state = {
            data: getData(),
            palette: this.getRandomPalette()
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart header="World Population(in millions)" bindingX="year" itemsSource={this.state.data} palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisY" min={4000}></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries name="Population" binding="population"></wjChart.FlexChartSeries>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
