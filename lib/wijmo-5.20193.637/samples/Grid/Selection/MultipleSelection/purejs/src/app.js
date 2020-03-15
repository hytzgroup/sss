import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { glbz, isNumber, saveFile } from '@grapecity/wijmo';
import { FlexGrid, SelectionMode, CellRange } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create some random data
    var data = [];
    var countries = 'Austria,Belgium,Chile,Denmark,Finland,Japan,UK'.split(',');
    for (var i = 0; i < 300; i++) {
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
    // show the data in a grid
    var theGrid = new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        showMarquee: true,
        showSelectedHeaders: 'All',
        anchorCursor: true,
        selectionMode: SelectionMode.MultiRange,
        itemsSource: data,
        // update aggregate display when selection changes
        selectionChanged: (s, e) => {
            // calculate aggregates
            let agg = { cnt: 0, cntAll: 0, sum: 0, avg: 0, cells: {} };
            s.selectedRanges.forEach(rng => {
                aggregateRange(s, agg, rng);
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
        }
    });
    // update aggregates for a range
    function aggregateRange(grid, agg, rng) {
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
    // export grid or selection to CSV
    document.getElementById('btn-csv-grid').addEventListener('click', () => {
        var rng = new CellRange(0, 0, theGrid.rows.length - 1, theGrid.columns.length - 1), csv = theGrid.getClipString(rng, true, true);
        saveFile(csv, 'FlexGrid.csv');
    });
    document.getElementById('btn-csv-sel').addEventListener('click', () => {
        var csv = theGrid.getClipString(null, true, true);
        saveFile(csv, 'FlexGridSelection.csv');
    });
}
