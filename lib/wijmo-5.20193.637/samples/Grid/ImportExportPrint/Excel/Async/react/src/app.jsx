import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";
import * as wjcXlsx from "@grapecity/wijmo.xlsx";
import * as wjcGridXlsx from "@grapecity/wijmo.grid.xlsx";
import { getProductOrders } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getProductOrders(500),
            fileName: "",
            includeColumnHeader: true,
            customContent: false
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="row">
                
                <wjcGrid.FlexGrid itemsSource={this.state.data} initialized={this.initializeFlexSheet.bind(this)}>
                    <wjcGrid.FlexGridColumn header="ID" binding="id"></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="Start Date" binding="start" format="d"></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="End Date" binding="end" format="d"></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="Country" binding="country"></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="Product" binding="product"></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="Color" binding="color" width={70}></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="Amount" binding="amount" format="c" aggregate="Sum"></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="Pending" binding="amount2" format="c2" aggregate="Sum"></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="Discount" binding="discount" format="p1" aggregate="Avg"></wjcGrid.FlexGridColumn>
                    <wjcGrid.FlexGridColumn header="Active" binding="active" width={70}></wjcGrid.FlexGridColumn>
                </wjcGrid.FlexGrid>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    <div className="form-inline well well-lg">
                        <input type="file" className="form-control" style={{ width: '250px' }} id="importFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12"/>
                    <button onClick={this.load.bind(this)} className="btn btn-default">Import</button>
                        <div className="checkbox">
                            <label>
                                <input defaultChecked type="checkbox"/> Include Column Header
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xs-12">
                    <div className="form-inline well well-lg">
                        <button onClick={this.save.bind(this)} className="btn btn-default">Export</button>
                        <div className="checkbox">
                            <label>
                                <input defaultChecked type="checkbox"/> Include Column Header
                        </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input v-model="customContent" type="checkbox"/> Custom Cell Content
                        </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
    initializeFlexSheet(flex) {
        this.flex = flex;
        let groupNames = ["Product", "Country", "Amount"], cv, propName, groupDesc;
        // get the collection view, start update
        cv = flex.collectionView;
        cv.beginUpdate();
        // clear existing groups
        cv.groupDescriptions.clear();
        // add new groups
        for (let i = 0; i < groupNames.length; i++) {
            propName = groupNames[i].toLowerCase();
            if (propName == "amount") {
                // group amounts in ranges
                // (could use the mapping function to group countries into continents,
                // names into initials, etc)
                groupDesc = new wjcCore.PropertyGroupDescription(propName, (item, prop) => {
                    let value = item[prop];
                    if (value > 1000)
                        return "Large Amounts";
                    if (value > 100)
                        return "Medium Amounts";
                    if (value > 0)
                        return "Small Amounts";
                    return "Negative";
                });
                cv.groupDescriptions.push(groupDesc);
            }
            else if (propName) {
                // group other properties by their specific values
                groupDesc = new wjcCore.PropertyGroupDescription(propName);
                cv.groupDescriptions.push(groupDesc);
            }
        }
        // done updating
        cv.endUpdate();
    }
    save() {
        wjcGridXlsx.FlexGridXlsxConverter.saveAsync(this.flex, {
            includeColumnHeaders: this.state.includeColumnHeader,
            includeCellStyles: false,
            formatItem: this.state.customContent ? this.state._exportFormatItem : null
        }, "FlexGrid.xlsx");
    }
    load() {
        let fileInput = document.getElementById("importFile");
        if (fileInput.files[0]) {
            this.setState({
                customContent: false
            });
            wjcGridXlsx.FlexGridXlsxConverter.loadAsync(this.flex, fileInput.files[0], { includeColumnHeaders: this.state.includeColumnHeader });
        }
    }
    exportFormatItem(args) {
        var p = args.panel, row = args.row, col = args.col, xlsxCell = args.xlsxCell, cell, color;
        if (p.cellType === wjGrid.CellType.Cell) {
            if (p.columns[col].binding === "color") {
                //color = p.rows[row].dataItem['color'];
                if (xlsxCell.value) {
                    if (!xlsxCell.style.font) {
                        xlsxCell.style.font = {};
                    }
                    xlsxCell.style.font.color = xlsxCell.value.toLowerCase();
                }
            }
            else if (p.columns[col].binding === "active" &&
                p.rows[row] instanceof wjGrid.GroupRow) {
                cell = args.getFormattedCell();
                xlsxCell.value = cell.textContent.trim();
                xlsxCell.style.hAlign = wjcXlsx.HAlign.Left;
            }
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
