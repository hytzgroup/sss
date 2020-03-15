<template>
  <div class="container-fluid">
    <wj-flex-grid :itemsSource="data" :initialized="initializedGrid"></wj-flex-grid>
    <div style="display:none">
      	<wj-list-box class="column-picker" :initialized="initializedPicker"></wj-list-box>
    </div>

    <p>
		You can use the grid's
		<b>columnLayout</b> property to allow users
		to save and restore column layouts. Click the buttons below
		to see how this works:
    </p>
    <button v-on:click="saveLayout" class="btn btn-default">Save Layout</button>
    <button v-on:click="loadLayout" class="btn btn-default">Restore Layout</button>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.input";
import { showPopup, hidePopup, hasClass, contains, closest } from "@grapecity/wijmo";
import { getData } from "./data";

new Vue({
  	el: "#app",
  	data: function() {
		return {
			data: getData()
		};
  	},
  	methods: {
		saveLayout() {
			localStorage.setItem("myLayout", this.flex.columnLayout);
		},
		loadLayout() {
			let layout = localStorage.getItem("myLayout");
			if (layout) {
				this.flex.columnLayout = layout;
			}
		},
		initializedPicker(picker){
			this.columnPicker = picker;
		},
		initializedGrid(ctl) {
			this.flex = ctl;
			this.flex.formatItem.addHandler((s, e) => {
				if (e.panel == s.topLeftCells) {
				e.cell.innerHTML =
					'<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
				}
			});

			// show the column picker when the user clicks the top-left cell
			let ref = this.flex.hostElement.querySelector(".wj-topleft");
			ref.addEventListener("mousedown", e => {
				if (hasClass(e.target, "column-picker-icon")) {
                    let host = this.columnPicker.hostElement;
                    if (!host.offsetHeight) {
					    showPopup(host, ref, false, true, false);
					    this.columnPicker.focus();
                    } else {
					    hidePopup(host, true, true);
                        this.flex.focus();
                    }
					e.preventDefault();
				}
            });
            
            // work around Safari/IOS bug (TFS 321525, 361500, 402670)
            // https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
            window.addEventListener('touchstart', (e) => {
                let host = this.columnPicker.hostElement;
                if (!contains(host, e.target) && !closest(e.target, '.wj-flexgrid')) {
                    hidePopup(host, true, true);
                }
            });

		}
	},
	mounted: function(){
		if (this.flex) {
            this.columnPicker.itemsSource = this.flex.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                hidePopup(this.columnPicker.hostElement);
            });
        }
	}  
});
</script>

<style>
	.wj-flexgrid {
		max-height: 300px;
		margin: 10px 0;
	}
	.column-picker-icon {
		cursor: pointer;
		color: #FF8754;
		margin: 3px;
    }
    .wj-listbox.column-picker {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 0 10px;    
        columns: 4; /* IE fallback */
        padding: 12px;
        margin-left: 12px;
        margin-top: 26px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
    body .wj-listbox .wj-listbox-item > label {
        display: block;
        margin: 0 0 3px 0;
    }
</style>

