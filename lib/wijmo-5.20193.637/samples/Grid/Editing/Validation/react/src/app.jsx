import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={50} isReadOnly={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country" isRequired={true} dataMap="countries"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" format="n2"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" format="n2"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="overdue" header="Overdue"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        flex.cellEditEnding.addHandler((s, e) => {
            let col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                let value = wjcCore.changeType(s.activeEditor.value, wjcCore.DataType.Number, col.format);
                if (!wjcCore.isNumber(value) || value < 0) {
                    e.cancel = true;
                    alert('Please enter a positive amount.');
                }
            }
        });
    }
    getData() {
        // create some random data
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
