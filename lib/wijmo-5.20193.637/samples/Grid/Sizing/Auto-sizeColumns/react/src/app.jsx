import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
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
            <wjcGrid.FlexGrid itemsSource={this.state.data} autoGenerateColumns={false} allowResizing="None" loadedRows={this.onLoadedRows.bind(this)} cellEditEnded={this.onCellEditEnded.bind(this)} rowEditEnded={this.onRowEditEnded.bind(this)}>
                <wjcGrid.FlexGridColumn binding="id" header="ID" minWidth={60} isReadOnly={true}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="countries" header="Countries"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="sales" header="Sales" minWidth={80}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="expenses" header="Expenses" minWidth={80}></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    onLoadedRows(grid) {
        grid.autoSizeColumns();
    }
    onCellEditEnded(grid, e) {
        grid.autoSizeColumn(e.col);
    }
    onRowEditEnded(grid) {
        grid.autoSizeColumns();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
