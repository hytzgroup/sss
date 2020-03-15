import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                itemsSource: getData(10000),
                showColumnTotals: 'GrandTotals',
                showRowTotals: 'Subtotals',
                fields: [
                    { binding: 'product', header: 'Product' },
                    { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
                    {
                        header: 'Range',
                        dataType: 'String',
                        aggregate: 'Cnt',
                        getValue: (item) => {
                            let sales = item.sales;
                            return sales <= 13 ? 'Low' : sales >= 17 ? 'High' : 'Medium';
                        }
                    },
                    { binding: 'sales', header: 'Sales', format: 'n0' },
                    { binding: 'downloads', header: 'Downloads', format: 'n0' },
                    {
                        header: 'Conversion',
                        dataType: 'Number',
                        aggregate: 'Avg',
                        format: 'p0',
                        getValue: (item) => {
                            return item.downloads ? item.sales / item.downloads : 0;
                        }
                    }
                ],
                rowFields: ['Date', 'Range'],
                valueFields: ['Sales', 'Conversion']
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <Olap.PivotPanel itemsSource={this.state.ng}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-6">
                        <Olap.PivotGrid itemsSource={this.state.ng}></Olap.PivotGrid>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
