<template>
    <div class="container-fluid">
        <label>
            multiRowGroupHeaders:
            <input type="checkbox" checked @click="event => multiRowGroupHeaders = event.target.checked"/> 
        </label> 
        <wj-multi-row
            :itemsSource="data"
            :layoutDefinition="layout"
            :multiRowGroupHeaders="multiRowGroupHeaders"
            :initialized="sender => sender.collapseGroupsToLevel(1)"
        ></wj-multi-row>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";

    import "@grapecity/wijmo.vue2.grid.multirow";
    import { getGroupedData, getLayoutDefinition } from './data';

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getGroupedData(200),
                layout: getLayoutDefinition(),
                multiRowGroupHeaders: true
            }
        },
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-multirow {
        height: 400px;
        margin: 6px 0;
    }
    .wj-multirow .wj-cell.sales {
        color: darkgreen;
        font-weight: bold;
        font-style: italic;
    }
    .wj-multirow .wj-cell.expenses {
        color: darkred;
        font-weight: bold;
        font-style: italic;
    }
</style>