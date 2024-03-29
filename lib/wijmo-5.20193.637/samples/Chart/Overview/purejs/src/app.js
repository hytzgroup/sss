import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as interaction from '@grapecity/wijmo.chart.interaction';
import { getData } from './data';
import { AggregateSeries } from './AggregateSeries';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let palette = ['rgba(3,62,118,1)', 'rgba(135,192,72,1)', 'rgba(89,130,44,1)'];
    //
    let data = getData();
    // create the chart
    var theChart = new chart.FlexChart('#theChart', {
        itemsSource: data,
        bindingX: 'date',
        legend: {
            position: 'Bottom'
        },
        chartType: chart.ChartType.Line,
        legendToggle: true,
        axisX: {
            min: data[0].date,
            max: data[data.length - 1].date,
        },
        series: [
            { binding: 'high', name: 'High' },
            { binding: 'low', name: 'Low' }
        ],
        tooltip: {
            content: function (ht) {
                if (!ht) {
                    return '';
                }
                else if (ht.x && ht.y) {
                    return '<b>Date:</b> ' + core.Globalize.formatDate(ht.x, 'MM-dd-yyyy') + '<br>' +
                        '<b>Value:</b> ' + ht.y.toFixed(2);
                }
            }
        },
        palette: palette,
        plotMargin: 'NaN 40 NaN 40' // top, right, bottom, left
    });
    //
    let series = new AggregateSeries();
    theChart.beginUpdate();
    series.itemsSource = data;
    series.chartType = chart.ChartType.Column;
    series.binding = 'close';
    series.bindingX = 'date';
    series.name = 'Aggregate Avg';
    series.groupAggregate = core.Aggregate.Avg;
    series.autoGroupIntervals = ["YYYY"];
    series.autoInterval = true;
    series.itemFormatter = (engine, hitTestInfo, defaultFormat) => {
        let ht = hitTestInfo;
        if (ht.series instanceof AggregateSeries && ht.chartElement == chart.ChartElement.SeriesSymbol) {
            let s = ht.series, len = s.getValues(0).length, vLen = s._values.length, c = ht.chart, ax = c.axisX, dx = c._dataInfo.dx * vLen / len, pt = ht.point, y = c.axisY.convert(c.axisY.actualMin), x = Math.abs(ax.convert(dx) - ax.convert(0));
            //
            engine.drawRect(pt.x - x / 2, pt.y, x, y - pt.y, null, s.symbolStyle /* ,'plotRect'*/);
        }
        else {
            // render element as usual
            defaultFormat();
        }
    };
    theChart.series.push(series);
    theChart.endUpdate();
    //
    // create the chart with range selector
    var theChartSelector = new chart.FlexChart('#theChartSelector', {
        itemsSource: data,
        bindingX: 'date',
        chartType: chart.ChartType.Area,
        legend: {
            position: chart.Position.None
        },
        axisX: {
            position: chart.Position.None
        },
        axisY: {
            position: chart.Position.None
        },
        tooltip: { content: '' },
        palette: palette,
        series: [
            { binding: 'close' }
        ],
        plotMargin: 'NaN 40 NaN 40' // top, right, bottom, left
    });
    var rangeSelector = new interaction.RangeSelector(theChartSelector, {
        seamless: true,
        rangeChanged: function (sender) {
            theChart.beginUpdate();
            theChart.axisX.min = sender.min;
            theChart.axisX.max = sender.max;
            if (series.autoGroupIntervals.length === 1) {
                series.autoGroupIntervals = ['WW', 'MM', 'YYYY'];
            }
            theChart.endUpdate();
        }
    });
}
