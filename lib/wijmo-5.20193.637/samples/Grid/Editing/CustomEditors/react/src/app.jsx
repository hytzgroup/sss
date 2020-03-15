import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcInput from '@grapecity/wijmo.input';
import { CustomGridEditor } from './customEditor';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this.products = [
            { id: 0, name: 'Widget', unitPrice: 23.43 },
            { id: 1, name: 'Gadget', unitPrice: 12.33 },
            { id: 2, name: 'Doohickey', unitPrice: 53.07 }
        ];
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
			<wjGrid.FlexGrid keyActionTab="CycleOut" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={40} isReadOnly={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="date" header="Date" format="d"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="time" header="Time" format="t"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="product" header="Product"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="amount" header="Amount" format="n2"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        new CustomGridEditor(flex, 'date', wjcInput.InputDate, {
            format: 'd'
        });
        new CustomGridEditor(flex, 'time', wjcInput.InputTime, {
            format: 't',
            min: new Date(2000, 1, 1, 7, 0),
            max: new Date(2000, 1, 1, 22, 0),
            step: 30
        });
        new CustomGridEditor(flex, 'country', wjcInput.ComboBox, {
            itemsSource: this.countries
        });
        new CustomGridEditor(flex, 'amount', wjcInput.InputNumber, {
            format: 'n2',
            step: 10
        });
        // create an editor based on a ComboBox
        let multiColumnEditor = new CustomGridEditor(flex, 'product', wjcInput.ComboBox, {
            headerPath: 'name',
            displayMemberPath: 'name',
            itemsSource: this.products
        });
        // customize the ComboBox to show multiple columns
        let combo = multiColumnEditor.control;
        combo.listBox.formatItem.addHandler((s, e) => {
            e.item.innerHTML = '<table><tr>' +
                '<td style="width:30px;text-align:right;padding-right:6px">' + e.data.id + '</td>' +
                '<td style="width:100px;padding-right:6px"><b>' + e.data.name + '</b></td>' +
                '<td style="width:80px;text-align:right;padding-right:6px">' +
                wjcCore.Globalize.format(e.data.unitPrice, 'c') +
                '</td>' +
                '</tr></table>';
        });
    }
    getData() {
        // create some random data
        let data = [];
        let dt = new Date();
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                date: new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                time: new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                country: this.countries[Math.floor(Math.random() * this.countries.length)],
                product: this.products[Math.floor(Math.random() * this.products.length)].name,
                amount: Math.random() * 10000 - 5000,
                discount: Math.random() / 4
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
