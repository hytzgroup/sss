import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid.multirow';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.collapsedHeadersChanged = (sender) => {
            this.state.cbCollapsedHeaders.selectedValue = sender.collapsedHeaders;
        };
        this.selectedIndexChanged = (sender) => {
            this.state.chMultirow.collapsedHeaders = sender.selectedValue;
        };
        this.onShowHeaderCollapseButton = (target) => {
            this.state.chMultirow.showHeaderCollapseButton = target.checked;
        };
        this.initializeMultirow = (chMultirow) => {
            this.setState({ chMultirow: chMultirow });
            this.setState({ collapsedHeaders: this.state.chMultirow.collapsedHeaders });
        };
        this.initializeCollapsedHeaders = (cbCollapsedHeaders) => {
            this.setState({ cbCollapsedHeaders: cbCollapsedHeaders });
        };
        this.state = {
            orders: getData().orders,
            threeLines: getData().ldThreeLines,
            cbCollapsedHeadersSource: [
                { name: "true", value: true },
                { name: "false", value: false },
                { name: "null", value: null }
            ],
            collapsedHeaders: '',
            cbCollapsedHeaders: {
                selectedValue: true
            },
            chMultirow: {
                showHeaderCollapseButton: true
            }
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.MultiRow itemsSource={this.state.orders} layoutDefinition={this.state.threeLines} initialized={this.initializeMultirow} collapsedHeaders={this.state.cbCollapsedHeaders.selectedValue} showHeaderCollapseButton={this.state.chMultirow.showHeaderCollapseButton} collapsedHeadersChanged={this.collapsedHeadersChanged}></wjGrid.MultiRow>
            <div>
                <label htmlFor="cbCollapsedHeaders">
                    Collapsed Headers
                    <wjInput.ComboBox itemsSource={this.state.cbCollapsedHeadersSource} displayMemberPath="name" selectedIndexChanged={this.selectedIndexChanged} selectedValuePath="value" initialized={this.initializeCollapsedHeaders}>
                    </wjInput.ComboBox>
                </label>
                <label htmlFor="cbshowHeaderCollapseButton">
                    Show Header Collapse Button
                    <input type="checkbox" defaultChecked={true} onChange={e => this.onShowHeaderCollapseButton(e.target)}/>
                </label>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
