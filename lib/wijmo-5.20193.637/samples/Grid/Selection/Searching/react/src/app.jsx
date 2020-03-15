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
            <wjcGrid.FlexGrid autoSearch={true} isReadOnly={true} selectionMode="ListBox" itemsSource={this.state.data}>
                <wjcGrid.FlexGridColumn binding="name" header="Country" width="2*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="pop" header="Population (mi)" format="n0" width="*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="gdp" header="GDP (US$mi/yr)" format="n0" width="*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="pci" header="Income (US$/yr/cap)" format="n0" width="*"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
