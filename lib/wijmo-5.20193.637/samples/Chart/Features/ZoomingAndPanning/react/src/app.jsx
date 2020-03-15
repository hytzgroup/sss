import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            zoom: {
                ptStart: null,
                ptEnd: null,
                box: null
            }
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <button id="btnReset" className="btn btn-default" onClick={this.reset.bind(this)}>Reset Zoom</button>
                <wjChart.FlexChart itemsSource={this.state.data} bindingX="date" chartType="Candlestick" initialized={this.initializeChart.bind(this)}>
                    <wjChart.FlexChartSeries binding="high,low,open,close" name="Alphabet Inc"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    initializeChart(flex) {
        this.theChart = flex;
        let host = flex.hostElement, zoom = this.state.zoom;
        host.addEventListener('mousedown', e => zoom.ptStart = e);
        host.addEventListener('mousemove', e => {
            if (zoom.ptStart) {
                zoom.ptEnd = e;
                this.updateZoomBox();
            }
        });
        host.addEventListener('mouseup', e => {
            this.applyZoom();
            zoom.ptStart = zoom.ptEnd = null;
            this.updateZoomBox();
        });
    }
    updateZoomBox() {
        let zoom = this.state.zoom;
        if (!zoom.box) {
            zoom.box = wjCore.createElement('<div class="zoom-box"></div>', document.body);
        }
        if (!zoom.ptStart) {
            wjCore.setCss(zoom.box, {
                display: 'none'
            });
        }
        else {
            let x = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX), y = Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY), w = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - x, h = Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - y;
            //
            wjCore.setCss(zoom.box, {
                display: 'block',
                left: x,
                top: y,
                width: w,
                height: h
            });
        }
    }
    applyZoom() {
        let zoom = this.state.zoom, xmin = null, ymin = null, xmax = null, ymax = null, chart = this.theChart;
        //
        // calculate custom zoom
        if (zoom.ptStart && zoom.ptEnd) {
            // get mouse position in control coordinates
            let rc = chart.hostElement.getBoundingClientRect();
            xmin = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX) - rc.left,
                ymin = Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY) - rc.top,
                xmax = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - rc.left,
                ymax = Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - rc.top;
            //
            // convert to chart coordinates
            let pMin = chart.pointToData(xmin, ymin), pMax = chart.pointToData(xmax, ymax);
            //
            xmin = Math.min(pMin.x, pMax.x);
            ymin = Math.min(pMin.y, pMax.y);
            xmax = Math.max(pMin.x, pMax.x);
            ymax = Math.max(pMin.y, pMax.y);
        }
        //
        // apply new ranges to the chart axes
        chart.deferUpdate(() => {
            chart.axisX.min = xmin;
            chart.axisY.min = ymin;
            chart.axisX.max = xmax;
            chart.axisY.max = ymax;
        });
    }
    reset() {
        this.state.zoom.ptStart = this.state.zoom.ptEnd = null;
        this.updateZoomBox();
        this.applyZoom();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
