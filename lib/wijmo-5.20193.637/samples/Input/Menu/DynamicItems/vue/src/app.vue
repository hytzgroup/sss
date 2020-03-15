<template>
    <div class="container-fluid">
        <p>
            This Menu is bound to an array of items' data using the <b>itemsSource</b> property,
            and customizes items content using a <b>formatItem</b> event.
        </p>
        <div class="form-group">
            <wj-menu
                :itemsSource="musicians"
                :formatItem="formatItem"
                :header="'Artists'"
                :itemClicked="menuItemClicked">
            </wj-menu>
        </div>

        <p>
            For this Menu we generate an array of <b>wj-menu-item</b> components with custom
            item content, using Vue <b>v-for</b> directive iterating through an array 
            of palette data.
        </p>
        <div class="form-group">
            <wj-menu
                :header="'Palette'"
                :value="selectedPalette"
                :itemClicked="selectedPaletteChanged">
                <wj-menu-item :value="palette.name" v-for="palette in palettes">
                    <div>
                        {{palette.name}}
                        <span style='float: right'>
                            <div
                                v-for="color in palette.colors"
                                v-bind:style="{
                                    backgroundColor: color,
                                    display:'inline',
                                    padding:'2px',
                                    height:'10px',
                                    width:'3px'                        
                                }">
                            </div>
                        </span>
                    </div>
                </wj-menu-item>
            </wj-menu>        
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getPalettes, getMusicians } from './data';

    let App = Vue.extend({
        name: 'app',
        data:function() {
            const musicianNames = getMusicians();
            const musicians = [];
            for (let i = 0; i < musicianNames.length; i++) {
                let item = {
                    id: i,
                    name: musicianNames[i],
                    photo: '|Paul|John|George|Ringo|'
                        .indexOf('|' + musicianNames[i] + '|') >= 0
                        ? 'resources/' + musicianNames[i] + '.png'
                        : null
                };
                musicians.push(item);
            }
            const palettes = getPalettes();
            return {
                selectedPalette: 'Standard',
                musicians: musicians,
                palettes: palettes,
                template: '<div style="min-width: 160px">' +
                    '{itemIndex}. <b>{name}</b>' +
                    '</div>',
                photoTemplate: '<div style="min-width: 160px">' +
                    '{itemIndex}. <b>{name}</b>' +
                    '<div><img src="{photo}" height="50" /></div>' +
                    '</div>'
            }
        },
        methods: {
            menuItemClicked: function(menu) {
                alert(`You selected option **${menu.selectedIndex}** from menu **${menu.header}**`);
            },
            formatItem: function(sender, e) {
                const tpl = e.data.photo ? this.photoTemplate : this.template;
                e.data.itemIndex = e.index + 1;
                const html = wijmo.format(tpl, e.data, (data, name, fmt, val) => {
                    return wijmo.isString(data[name]) ? wijmo.escapeHtml(data[name]) : val;
                });
                e.item.innerHTML = html;
            },
            selectedPaletteChanged: function(e){
                if (e.selectedValue) {
                    this.selectedPalette = e.selectedValue;
                }
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-dropdown {
        margin-right: 5px;
    }

    body {
        margin-bottom: 24pt;
    }

    .wj-form-control div {
        display: inline;
    }
</style>
