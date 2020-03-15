<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :alternatingRowStep="0"
            :showMarquee="true"
            :anchorCursor="true"
            :selectionMode="'MultiRange'"
            :showSelectedHeaders="'All'"
            :itemsSource="data"
            :selectionChanged="selectionChanged"
            :initialized="initialized">
        </wj-flex-grid>
        <pre id="mr-aggregates">Ready</pre>
        
        <button class="btn btn-primary" @click="exportGridToCsv(false)">
            Export Whole Grid
        </button>
        <button id="btn-csv-sel" class="btn btn-primary" @click="exportGridToCsv(true)">
            Export Selection
        </button>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.grid';
    import { glbz, format, isNumber, saveFile } from '@grapecity/wijmo';
    import { CellRange } from '@grapecity/wijmo.grid';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: this.getData(),
                grid: null
            }
        },
        methods: {

            // create some random data
            getData: function() {
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
            },

            initialized: function(s) {
                this.grid = s;
            },

            // update aggregates when selection changes
            selectionChanged: function() {

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
            },
            aggregateRange: function(grid, agg, rng) {
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
            },

            // export grid or selection to CSV
            exportGridToCsv: function(selection) {
                let rng = selection
                    ? null // selection plus extended selection
                    : new CellRange(0, 0, this.grid.rows.length - 1, this.grid.columns.length - 1);
                let csv = this.grid.getClipString(rng, true, true);
                saveFile(csv, selection ? 'FlexGridSelection.csv' : 'FlexGrid.csv');
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
  height: 300px;
}
</style>
