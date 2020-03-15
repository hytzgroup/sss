import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <p>
                This example shows how you can use a <b>flex</b>
                layout within the cells to center the content vertically:
            </p>
            <wjcGrid.FlexGrid itemsSource={this.state.data} initialized={this.initialGrid.bind(this)} formatItem={this.onFormatItem.bind(this)}>
                <wjcGrid.FlexGridColumn binding="id" header="ID" width={50}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="country" header="Country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="product" header="Product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="sales" header="Sales" format="c0"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="expenses" header="Expenses" format="c0"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="active" header="Active"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    componentDidMount() {
        this.grid.rows.defaultSize = 45;
        this.grid.columnHeaders.rows.defaultSize = 65;
        this.grid.allowResizing = wjGrid.AllowResizing.Both;
        this.grid.deferResizing = true;
    }
    initialGrid(grid) {
        this.grid = grid;
    }
    onFormatItem(flexGird, e) {
        let style = e.cell.style;
        style.display = 'flex';
        style.alignItems = 'center'; // vertical alignment
        switch (style.textAlign) { // horizontal alighment
            case 'right':
                style.justifyContent = 'flex-end';
                break;
            case 'center':
                style.justifyContent = 'center';
                break;
            default:
                style.justifyContent = '';
                break;
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
