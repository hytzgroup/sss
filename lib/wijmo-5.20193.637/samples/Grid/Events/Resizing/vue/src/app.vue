<template>
    <div class="container-fluid">
        <wj-flex-grid
            :itemsSource="data"
            :initialized="flexInitialized">
            <wj-flex-grid-column binding="id" header="ID" :width="50" :isReadOnly="true" />
            <wj-flex-grid-column binding="country" header="Country" :isRequired="true" :dataMap="countries" />
            <wj-flex-grid-column binding="sales" header="Sales" format="n2" />
            <wj-flex-grid-column binding="expenses" header="Expenses" format="n2" />
            <wj-flex-grid-column binding="overdue" header="Overdue" />
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import "@grapecity/wijmo.vue2.input";
    import * as DataService from "./data";
    import { format } from "@grapecity/wijmo";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: DataService.getData(),
                countries: DataService.getCountries()
            };
        },
        methods: {
            flexInitialized: function(flexgrid) {
                let tt = new wijmo.Tooltip();
                flexgrid.resizingColumn.addHandler((s, e) => {
                    let tip = format('Column <b>{col}</b>, width <b>{wid:n0}px</b>', {
                        col: e.panel.columns[e.col].header || '[no header]',
                        wid: e.panel.columns[e.col].width
                    });
                    tt.show(flexgrid.hostElement, tip);
                });
                flexgrid.resizedColumn.addHandler(() => {
                    tt.hide();
                });
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 200px;
        margin-bottom: 12px;
    }
</style>
