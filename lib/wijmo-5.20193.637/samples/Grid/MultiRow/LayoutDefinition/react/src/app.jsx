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
        this.selectedIndexChanged = () => {
            let layoutDef = this.state.layoutDefs.currentItem;
            if (layoutDef) {
                this.state.multirow.layoutDefinition = layoutDef.def;
                this.setState({ layoutDescription: layoutDef.description });
            }
        };
        this.initialized = (multirow) => {
            this.setState({ multirow: multirow });
        };
        this.state = {
            orders: getData().orders,
            layoutDefs: getData().layoutDefs,
            layoutDescription: null,
            multirow: {}
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                Layout option:
                <wjInput.ComboBox itemsSource={this.state.layoutDefs} displayMemberPath="name" selectedIndexChanged={this.selectedIndexChanged}></wjInput.ComboBox>
            </label>
            <p>
                {this.state.layoutDescription}
            </p>
            <wjGrid.MultiRow itemsSource={this.state.orders} layoutDefinition={this.state.layoutDefs.currentItem.def} initialized={this.initialized}></wjGrid.MultiRow>
        </div>;
    }
    componentDidMount() {
        this.setState({ layoutDescription: this.state.layoutDefs.currentItem.description });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
