import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateFilter = (target) => {
            const filtredView = new wjCore.CollectionView(this.state.view.items, {
                filter: (item) => {
                    return target.value
                        ? item.country.toLowerCase().indexOf(target.value.toLowerCase()) > -1
                        : true;
                }
            });
            this.setState({
                view2: new wjCore.CollectionView(filtredView.items)
            });
        };
        this.state = {
            view: new wjCore.CollectionView(getData()),
            view2: null
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group row">
                <div className="col-xs-2">
                    <input className="form-control" placeholder="country filter" onInput={e => this.updateFilter(e.target)}/>
                </div>
            </div>

            <p>
                Result ({this.state.view2.items.length} items):
            </p>
            <wjGrid.FlexGrid alternatingRowStep={0} headersVisibility="Column" itemsSource={this.state.view2}>
            </wjGrid.FlexGrid>
        </div>;
    }
    componentWillMount() {
        this.setState({ view2: new wjCore.CollectionView(this.state.view.items) });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
