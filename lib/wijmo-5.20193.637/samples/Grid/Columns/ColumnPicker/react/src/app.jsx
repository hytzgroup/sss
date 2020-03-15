import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { showPopup, hidePopup, hasClass, contains, closest } from '@grapecity/wijmo';
import { ListBox } from '@grapecity/wijmo.react.input';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid initialized={this.initializedGrid.bind(this)} itemsSource={this.state.data}/>
            <div className="column-picker-div">
                <ListBox className="column-picker" initialized={this.initializedPicker.bind(this)}/>
            </div>

            <p>
                You can use the grid's  
                <b> columnLayout </b> property to allow users
                to save and restore column layouts. Click the buttons below
                to see how this works:
            </p>

            <button className="btn btn-default" onClick={this.saveLayout.bind(this)}>Save Layout</button>
            <button className="btn btn-default" onClick={this.loadLayout.bind(this)}>Restore Layout</button>
        </div>;
    }
    initializedGrid(ctl) {
        this.flex = ctl;
        this.flex.formatItem.addHandler((s, e) => {
            if (e.panel == s.topLeftCells) {
                e.cell.innerHTML =
                    '<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
            }
        });
        // show the column picker when the user clicks the top-left cell
        let ref = this.flex.hostElement.querySelector(".wj-topleft");
        ref.addEventListener("mousedown", e => {
            if (hasClass(e.target, "column-picker-icon")) {
                let host = this.columnPicker.hostElement;
                if (!host.offsetHeight) {
                    showPopup(host, ref, false, true, false);
                    this.columnPicker.focus();
                }
                else {
                    hidePopup(host, true, true);
                    this.flex.focus();
                }
                this.columnPicker.focus();
                e.preventDefault();
            }
        });
        // work around Safari/IOS bug (TFS 321525, 361500, 402670)
        // https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
        window.addEventListener('touchstart', (e) => {
            let host = this.columnPicker.hostElement;
            if (!contains(host, e.target) && !closest(e.target, '.wj-flexgrid')) {
                hidePopup(host, true, true);
            }
        });
    }
    initializedPicker(picker) {
        this.columnPicker = picker;
    }
    componentDidMount() {
        if (this.flex) {
            this.columnPicker.itemsSource = this.flex.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                hidePopup(this.columnPicker.hostElement);
            });
        }
    }
    saveLayout() {
        localStorage.setItem("myLayout", this.flex.columnLayout);
    }
    loadLayout() {
        let layout = localStorage.getItem("myLayout");
        if (layout) {
            this.flex.columnLayout = layout;
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
