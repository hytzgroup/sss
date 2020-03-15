import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
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
            <wjGrid.FlexGrid imeEnabled={true} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="#" width={50} isReadOnly={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="en" header="English" isRequired={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="ja" header="Japanese"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="pop" header="Pop (tho)" format="n0"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
