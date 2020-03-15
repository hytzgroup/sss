<template>
    <div class="container-fluid">
        <p>
            This MultiSelect uses a <b>formatItem</b> event to customize the display 
            of the items in the drop-down list.
        </p>
        <div class="row">
            <div class="col-xs-5">
                <div class="form-group">
                    <wj-multi-select
                        :displayMemberPath="'name'"
                        :placeholder="'Countries'"
                        :headerPath="'name'"
                        :itemsSource="data"
                        :initialized='initMultiSelect'
                        :checkedItemsChanged='onCheckedItemsChanged'
                        :format-item="formatItem">
                    </wj-multi-select>
                </div>
                <div class="form-group">
                    <label>
                        Show "Select All" box
                        <input id="selectAll" type="checkbox" v-model="theMultiSelect.showSelectAllCheckbox">
                    </label>
                </div>
            </div>
            <div class="col-xs-7">
                <p>
                    <b>Checked Items:</b>
                </p>
                <ul>
                    <li v-for="item of checkedItems" :key="item">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                data: getData(),
                theMultiSelect: {},
                checkedItems: [],
                multiSelectTableItemTemplate: '<div class="item">' +
                    '<label><input type="checkbox"/>{name}</label><br/>' +
                    '<b>{city}</b> ({state})<br/>' +
                    '{address}<br/>' +
                    'Phone: <b>{phone}</b><br/>' +
                    'Fax: <b>{fax}</b><br/>' +
                    'Website: <a href="{site}" target="_blank">{site}</a><br/>' +
                    '</div>'
            }
        },
        methods: {
            formatItem: function(sender, e){
                let html = wijmo.format(this.multiSelectTableItemTemplate, e.data, (data, name, fmt, val) => {
                    return wijmo.isString(data[name]) ? wijmo.escapeHtml(data[name]) : val;
                });
                e.item.innerHTML = html;
            },
            onCheckedItemsChanged: function(s){
                this.checkedItems = s.checkedItems;
            },
            initMultiSelect: function(multiSelect){
                this.theMultiSelect = multiSelect;
            },
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24pt;
    }

    .item {
        margin: 8px;
        font-size: 80%;
    }

    .item label {
        display: inline-flex;
    }

    .item input[type=checkbox] {
        margin: 0px;
    }

    .wj-listbox-item h1 {
        font-size: 12pt;
        font-weight: bold;
        margin: 4px -8px;
    }
</style>