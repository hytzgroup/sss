import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { glbz, isNumber, saveFile } from "@grapecity/wijmo";
import { FlexGrid } from "@grapecity/wijmo.react.grid";
import { CellRange } from "@grapecity/wijmo.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.grid = null;
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid alternatingRowStep={0} showMarquee={true} anchorCursor={true} selectionMode="MultiRange" showSelectedHeaders="All" itemsSource={this.state.data} initialized={s => this.grid = s} 
        // update aggregate display when selection changes
        selectionChanged={(s) => {
            // calculate aggregates
            let agg = { cnt: 0, cntAll: 0, sum: 0, avg: 0, cells: {} };
            s.selectedRanges.forEach(rng => {
                this.aggregateRange(s, agg, rng);
            });
            // update the display using template literals
            let msg = (agg.cnt > 1) ? glbz `Count: <b>${agg.cntAll}:n0</b>\tAverage: <b>${agg.avg}:g4\tSum: <b>${agg.sum}:g4</b>`
                : (agg.cntAll > 1) ? glbz `Count: <b>${agg.cntAll}:n0</b>`
                    : 'Ready';
            // update the display using wijmo.format
            //let msg = (agg.cnt > 1) ? format('Count: <b>{cntAll:n0}</b>\tAverage: <b>{avg:g4}</b>\tSum: <b>{sum:g4}</b>', agg)
            //    : (agg.cntAll > 1) ? format('Count: <b>{cntAll:n0}</b>', agg)
            //    : 'Ready';
            document.getElementById('mr-aggregates').innerHTML = msg;
        }}/>
            <pre id="mr-aggregates">Ready</pre>
            
            <button className="btn btn-primary" onClick={() => this.exportGridToCsv(this.grid, false)}>
                Export Whole Grid
            </button>
            {' '}
            <button id="btn-csv-sel" className="btn btn-primary" onClick={() => this.exportGridToCsv(this.grid, true)}>
                Export Selection
            </button>
        </div>;
    }
    // update aggregates for a range
    aggregateRange(grid, agg, rng) {
        for (let r = rng.topRow; r <= rng.bottomRow; r++) {
            for (let c = rng.leftCol; c <= rng.rightCol; c++) {
                let key = r + ',' + c;
                if (!agg.cells[key]) { // account for overlapping ranges
                    agg.cells[key] = true;
                    let data = grid.getCellData(r, c, false);
                    if (isNumber(data)) { // handle numbers
                        agg.cnt++;
                        agg.sum += data;
                    }
                    if (data != '' && data != null) { // handle non-empty cells
                        agg.cntAll++;
                    }
                }
            }
        }
        agg.avg = agg.cnt > 0 ? agg.sum / agg.cnt : 0;
    }
    // export the grid or selection to CSV
    exportGridToCsv(grid, selection) {
        let rng = selection
            ? null // selection plus extended selection
            : new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1);
        let csv = grid.getClipString(rng, true, true);
        saveFile(csv, selection ? 'FlexGridSelection.csv' : 'FlexGrid.csv');
    }
    // create some random data
    getData() {
        let data = [];
        let countries = 'Austria,Belgium,Chile,Denmark,Finland,Japan,UK'.split(',');
        for (let i = 0; i < 300; i++) {
            data.push({
                id: i,
                from: countries[i % countries.length],
                to: countries[(i + 1) % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                amount: Math.random() * 10000,
                extra: Math.random() * 10000,
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
