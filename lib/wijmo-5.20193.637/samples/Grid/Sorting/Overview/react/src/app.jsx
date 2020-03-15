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
            <wjcGrid.FlexGrid deferResizing={true} itemsSource={this.state.data}>
                <wjcGrid.FlexGridColumn binding="id" header="ID" width={60} allowSorting={false}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="country" header="Country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="sales" header="Sales"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="expenses" header="Expenses"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
            <div className="panel panel-warning">
                <div className="panel-heading">
                    Although the <b>CollectionView</b> class supports sorting
                    on multiple properties, the grid does not provide a UI
                    for that. You can build your own Excel-style sort dialogs
                    if you need that functionality. See for example the
                    <a href="https://demos.wijmo.com/5/SampleExplorer/SampleExplorer/Sample/SortingGroupingUI" target="_blank">SortingGroupingUI</a> demo.
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
