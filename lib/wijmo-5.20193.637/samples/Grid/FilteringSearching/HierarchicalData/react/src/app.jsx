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
            <div className="input-group">
                <div className="input-group-addon">
                    <span className="glyphicon glyphicon-search"></span>
                </div>
                <input onInput={this.filter.bind(this)} className="form-control" placeholder="Filter"/>
            </div>
            
            <wjGrid.FlexGrid childItemsPath="cities" headersVisibility="Column" initialized={this.initialized.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>

            <p>
              For more details in hierarchical filtering, please see our{' '}
              <a href="https://wijmo.com/blog/filter-hierarchical-data-flexgrid/" target="_blank">
                How to Filter Hierarchical Data in FlexGrid and Angular
              </a>
              {' '}blog.
            </p>
        </div>;
    }
    applyHierarchicalFilter(grid, filter) {
        let rows = grid.rows;
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i], state = row.dataItem, rng = row.getCellRange();
            // handle states (level 0)
            if (row.level == 0) {
                // check if the state name matches the filter
                let stateVisible = state.name.toLowerCase().indexOf(filter) >= 0;
                if (stateVisible) {
                    // it does, so show the state and all its cities
                    for (let j = rng.topRow; j <= rng.bottomRow; j++) {
                        rows[j].visible = true;
                    }
                }
                else {
                    // it does not, so check the cities
                    for (let j = rng.topRow + 1; j <= rng.bottomRow; j++) {
                        let city = rows[j].dataItem, cityVisible = city.name.toLowerCase().indexOf(filter) >=
                            0;
                        rows[j].visible = cityVisible;
                        stateVisible = stateVisible || cityVisible;
                    }
                    // if at least one city is visible, the state is visible
                    rows[i].visible = stateVisible;
                }
                // move on to the next group
                i = rng.bottomRow;
            }
        }
    }
    filter(e) {
        let filter = e.target.value.toLowerCase();
        this.applyHierarchicalFilter(this.flex, filter);
    }
    initialized(flex) {
        this.flex = flex;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
