import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjcChart from "@grapecity/wijmo.chart";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: null,
            paletteData: 'Standard,Cocoa,Coral,Dark,HighContrast,Light,Midnight,Modern,Organic,Slate,Zen,Cyborg,Superhero,Flatly,Darkly,Cerulan'.split(',')
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label>
                    Please select a Palette:
                    <wjInput.ComboBox itemsSource={this.state.paletteData} selectedIndexChanged={this.selectedIndexChanged.bind(this)}></wjInput.ComboBox>
                </label>
                <wjChart.FlexChart header="Country GDP" itemsSource={this.state.data} bindingX="country" palette={this.state.palette}>
                    <wjChart.FlexChartSeries binding="2014" name="2014"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="2015" name="2015"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="2016" name="2016"></wjChart.FlexChartSeries>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    selectedIndexChanged(s) {
        let pal = s.text.toLowerCase();
        this.setState({
            palette: wjcChart.Palettes[pal]
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
