import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { glbz, format, isNumber, saveFile } from '@grapecity/wijmo';
import { FlexGrid, CellRange } from '@grapecity/wijmo.grid';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    // reference to grid component
    @ViewChild('grid') grid: FlexGrid;

    // update aggregates when selection changes
    selectionChanged() {

        // calculate aggregates
        let agg = { cnt: 0, cntAll: 0, sum: 0, avg: 0, cells: {} };
        this.grid.selectedRanges.forEach(rng => {
            this.aggregateRange(this.grid, agg, rng);
        });

        // update the display using template literals
        let msg = (agg.cnt > 1) ? glbz`Count: <b>${agg.cntAll}:n0</b>\tAverage: <b>${agg.avg}:g4\tSum: <b>${agg.sum}:g4</b>`
            : (agg.cntAll > 1) ? glbz`Count: <b>${agg.cntAll}:n0</b>`
            : 'Ready'

        // update the display using wijmo.format
        //let msg = (agg.cnt > 1) ? format('Count: <b>{cntAll:n0}</b>\tAverage: <b>{avg:g4}</b>\tSum: <b>{sum:g4}</b>', agg)
        //    : (agg.cntAll > 1) ? format('Count: <b>{cntAll:n0}</b>', agg)
        //    : 'Ready';

        document.getElementById('mr-aggregates').innerHTML = msg;
    }
    aggregateRange(grid: FlexGrid, agg: any, rng: CellRange) {
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
    exportGridToCsv(selection: boolean) {
        let rng = selection
            ? null // selection plus extended ranges
            : new CellRange(0, 0, this.grid.rows.length - 1, this.grid.columns.length - 1);
        let csv = this.grid.getClipString(rng, true, true);
        saveFile(csv, selection ? 'FlexGridSelection.csv' : 'FlexGrid.csv', 'text/csv');
    }

    // create some random data
    private _getData() {
        let data = [];
        let countries = 'Austria,Belgium,Chile,Denmark,Finland,Japan,UK'.split(',');
        for (let i = 0; i < 300; i++) {
            data.push({
                id: i,
                from: countries[i % countries.length],
                to: countries[(i+1) % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                amount: Math.random() * 10000,
                extra: Math.random() * 10000,
            });
        }
        return data;
    }
}

@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

