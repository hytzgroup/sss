import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { showPopup, hidePopup, hasClass, contains, closest } from '@grapecity/wijmo';
import { ListBox } from '@grapecity/wijmo.input';
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    
    // references FlexGrid named 'flex' in the view
    @ViewChild('flex') flex: FlexGrid;
    @ViewChild('columnPicker') columnPicker: ListBox;

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    ngOnInit() {
        if (this.flex) {
            this.flex.formatItem.addHandler((s: FlexGrid, e: FormatItemEventArgs) => {
                if (e.panel == s.topLeftCells) {
                    e.cell.innerHTML = '<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
                }
            });
    
            // show the column picker when the user clicks the top-left cell
            let ref = this.flex.hostElement.querySelector('.wj-topleft');
            ref.addEventListener('mousedown', (e) => {
                if (hasClass(<Element>e.target, 'column-picker-icon')) {
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
    }

    ngAfterViewInit() {
        if (this.flex) {
            this.columnPicker.itemsSource = this.flex.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                hidePopup(this.columnPicker.hostElement);
            });
        }
    }

    saveLayout() {
        localStorage.setItem('myLayout', this.flex.columnLayout);
    }

    loadLayout() {
        let layout = localStorage.getItem('myLayout');
        if (layout) {
    	    this.flex.columnLayout = layout;
		}
    }

    private _getData() {

        // generate some random data
        let data = [],
            countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
            products = ['Widget', 'Sprocket', 'Gadget', 'Doohickey'],
            colors = ['Black', 'White', 'Red', 'Green', 'Blue'],
            dt = new Date();
        for (let i = 0; i < 100; i++) {
            let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                countryId = Math.floor(Math.random() * countries.length),
                productId = Math.floor(Math.random() * products.length),
                colorId = Math.floor(Math.random() * colors.length);
            let item = {
                id: i,
                start: date,
                end: date,
                country: countries[countryId],
                product: products[productId],
                color: colors[colorId],
                countryId: countryId,
                productId: productId,
                colorId: colorId,
                amount1: Math.random() * 10000 - 5000,
                amount2: Math.random() * 10000 - 5000,
                amount3: Math.random() * 10000 - 5000,
                amount4: Math.random() * 10000 - 5000,
                amount5: Math.random() * 10000 - 5000,
                discount: Math.random() / 4,
                active: i % 4 == 0
            };
            data.push(item);
        }

        return data;
    }
}
//
@NgModule({
  imports: [WjGridModule, WjInputModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

