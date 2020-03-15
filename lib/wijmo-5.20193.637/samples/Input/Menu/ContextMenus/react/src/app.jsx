import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
//
class App extends React.Component {
    constructor() {
        super(...arguments);
        this._data = getData();
    }
    componentDidMount() {
        // use it as a context menu for one or more elements
        let els = document.querySelectorAll('.has-ctx-menu');
        for (let i = 0; i < els.length; i++) {
            els[i].addEventListener('contextmenu', e => {
                this._menu.owner = wijmo.closest(e.target, '.has-ctx-menu');
                if (this._menu.owner) {
                    e.preventDefault();
                    this._menu.show(e);
                }
            }, true);
        }
    }
    render() {
        return <div className="container-fluid">
            <div className="owners">
                <div id="first" className="has-ctx-menu" style={{ background: '#f0a0a0' }}>
                    I have a Context Menu.
                </div>
                <div id="second" className="has-ctx-menu" style={{ background: '#a0f0a0' }}>
                    I have the same Context Menu.
                </div>
            </div>

            <h4>
                The same approach works with all Wijmo controls:
            </h4>

            <p>
                FlexChart with ContextMenu
            </p>
            <wjChart.FlexChart id="theChart" className="has-ctx-menu" itemsSource={this._data} bindingX="country">
                <wjChart.FlexChartSeries binding="sales" name="Sales">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="expenses" name="Expenses">
                </wjChart.FlexChartSeries>
            </wjChart.FlexChart>

            <p>
                FlexGrid with ContextMenu
            </p>
            <wjGrid.FlexGrid id="theGrid" className="has-ctx-menu" itemsSource={this._data}>
            </wjGrid.FlexGrid>

            <wjInput.Menu style={{ display: 'none' }} header="Context Menu" selectedValuePath="cmd" initialized={this._initMenu.bind(this)} dropDownCssClass="ctx-menu" itemClicked={this._menuItemClicked.bind(this)}>
                <wjInput.MenuItem cmd="cmdNew">
                    <span className="glyphicon glyphicon-asterisk"></span>&nbsp;&nbsp;New
                </wjInput.MenuItem>
                <wjInput.MenuItem cmd="cmdOpen">
                    <span className="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;Open
                </wjInput.MenuItem>
                <wjInput.MenuItem cmd="cmdSave">
                    <span className="glyphicon glyphicon-floppy-disk"></span>&nbsp;&nbsp;Save
                </wjInput.MenuItem>
                <wjInput.MenuSeparator></wjInput.MenuSeparator>
                <wjInput.MenuItem cmd="cmdExit">
                    <span className="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;Exit
                </wjInput.MenuItem>
            </wjInput.Menu>
        </div>;
    }
    _initMenu(sender) {
        this._menu = sender;
    }
    _menuItemClicked(sender) {
        alert('Executing **' + sender.selectedValue + '** for element **' + sender.owner.id + '**');
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
