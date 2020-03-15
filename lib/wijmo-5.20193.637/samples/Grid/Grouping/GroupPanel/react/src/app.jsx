import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from "./data";
import * as wjGroup from "@grapecity/wijmo.react.grid.grouppanel";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            flex: null
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGroup.GroupPanel className="group-panel" grid={this.state.flex} placeholder="Drag columns here to create groups">
            </wjGroup.GroupPanel>

            <wjGrid.FlexGrid initialized={this.initialized.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
        </div>;
    }
    initialized(ctl) {
        this.setState({
            flex: ctl
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
