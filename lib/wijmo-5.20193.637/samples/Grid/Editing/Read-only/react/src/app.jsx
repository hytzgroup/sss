import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country" isRequired={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" isRequired={false}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" isRequired={false}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="overdue" header="Overdue"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        flex.beginningEdit.addHandler((s, e) => {
            let item = s.rows[e.row].dataItem;
            if (item.overdue) { // prevent editing overdue items
                e.cancel = true;
            }
        });
    }
    getData() {
        // create some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
