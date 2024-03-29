import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <p>
                By default, the ComboBox displays one item per line in its drop-down list:
            </p>
            <div className="form-group">
                <label htmlFor="theCombo">Default:</label>
                <wjInput.ComboBox displayMemberPath="country" itemsSource={this.state.data}></wjInput.ComboBox>
            </div>

            <p>
                If you have many short items, it may be interesting to use multiple columns in the drop-down. You can
            accomplish this with a little CSS and the <b>dropDownCssClass</b> property:
            </p>
            <div className="form-group">
                <label htmlFor="theComboCSS">Three Columns:</label>
                <wjInput.ComboBox dropDownCssClass="cb-flex" displayMemberPath="country" itemsSource={this.state.data}>
                </wjInput.ComboBox>
            </div>

            <p>
                If the items are complex objects, you may want to render a single item per line, 
                but with additional detail, as in a table or grid. You can accomplish this with 
                the <b>wjItemTemplate</b> <i>render prop</i> and <b>headerPath</b> property:
            </p>
            <div className="form-group">
                <label htmlFor="theComboTable">Table-Style:</label>
                <wjInput.ComboBox headerPath="country" displayMemberPath="country" itemsSource={this.state.data} wjItemTemplate={(context) => (<table>
                            <tr>
                                <td>{context.item.country}</td> 
                                <td className="number" title="GDP (million US$/year)">
                                    {wijmo.format('{gdpm:c0}', context.item)}
                                </td> 
                                <td className="number" title="Population (thousands)">
                                    {wijmo.format('{popk:n0}', context.item)}
                                </td> 
                                <td className="number" title="GDP/cap (US$/person/year)">
                                    {wijmo.format('{gdpcap:c0}', context.item)}
                                </td> 
                            </tr>
                        </table>)}>
                </wjInput.ComboBox>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
