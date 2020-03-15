import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
import { getData, getCountries } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            countries: getCountries()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid allowAddNew={true} initialized={this.flexInitialized.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country" isRequired={true} dataMap={this.state.countries}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" format="n2"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" format="n2"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="overdue" header="Overdue"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    flexInitialized(flexgrid) {
        var toolTip = new wjcCore.Tooltip();
        flexgrid.resizingColumn.addHandler((s, e) => {
            let tip = wjcCore.format('Column <b>{col}</b>, width <b>{wid:n0}px</b>', {
                col: e.panel.columns[e.col].header || '[no header]',
                wid: e.panel.columns[e.col].width
            });
            toolTip.show(flexgrid.hostElement, tip);
        });
        flexgrid.resizedColumn.addHandler(() => {
            toolTip.hide();
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
