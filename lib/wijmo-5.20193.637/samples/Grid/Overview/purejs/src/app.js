import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjSrch from '@grapecity/wijmo.grid.search';
import { getData, getColors, getCountries, getProducts } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the grid
    let theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData(500),
        selectionChanged: (s, e) => {
            document.querySelector('#cellRange').innerHTML = formatCellRange(e.range);
        },
        itemsSourceChanged: (s, e) => {
            theNav.cv = s.collectionView;
        }
    });
    // add a search/filter control to filter the data and highlight the matches
    let theFilter = new wjSrch.FlexGridSearch('#filter', {
        grid: theGrid
    });
    // add a navigator to move the collectionView cursor (works for items and/or pages)
    let theNav = new wjInput.CollectionViewNavigator('#cv-nav', {
        cv: theGrid.collectionView
    });
    // create item count menu
    let itemCountMenu = new wjInput.Menu('#itemCountMenu', {
        header: 'Items',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: '5', value: 5 },
            { header: '50', value: 50 },
            { header: '500', value: 500 },
            { header: '5,000', value: 5000 },
            { header: '50,000', value: 50000 },
            { header: '100,000', value: 100000 },
            { header: '500,000', value: 500000 },
            { header: '1,000,000', value: 1000000 }
        ],
        selectedValue: theGrid.itemsSource.length,
        // update header to show current selection
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                theGrid.itemsSource = getData(s.selectedValue);
                if (dataMapsMenu) {
                    updateDataMaps(dataMapsMenu.selectedValue);
                }
                if (formattingMenu) {
                    updateFormatting(formattingMenu.selectedValue);
                }
            }
        }
    });
    // create allow add new menu
    let allowAddNewMenu = new wjInput.Menu('#allowAddNewMenu', {
        // update header to show current selection
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                theGrid.allowAddNew = s.selectedValue;
            }
        },
        header: 'Allow Add',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'Yes', value: true },
            { header: 'No', value: false }
        ]
    });
    // initialize value
    allowAddNewMenu.selectedValue = false;
    // create selection mode menu
    let selectionModeMenu = new wjInput.Menu('#selectionModeMenu', {
        // update header to show current selection
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                theGrid.selectionMode = s.selectedValue;
            }
        },
        header: 'Selection',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'None', value: wjGrid.SelectionMode.None },
            { header: 'Cell', value: wjGrid.SelectionMode.Cell },
            { header: 'CellRange', value: wjGrid.SelectionMode.CellRange },
            { header: 'Row', value: wjGrid.SelectionMode.Row },
            { header: 'RowRange', value: wjGrid.SelectionMode.RowRange },
            { header: 'ListBox', value: wjGrid.SelectionMode.ListBox }
        ]
    });
    // initialize value
    selectionModeMenu.selectedValue = wjGrid.SelectionMode.CellRange;
    theGrid.selection = new wjGrid.CellRange(0, 0);
    // create header visibility menu
    let headersVisibilityMenu = new wjInput.Menu('#headersVisibilityMenu', {
        // update header to show current selection
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                theGrid.headersVisibility = s.selectedValue;
            }
        },
        header: 'Headers Visibility',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'None', value: wjGrid.HeadersVisibility.None },
            { header: 'Column', value: wjGrid.HeadersVisibility.Column },
            { header: 'Row', value: wjGrid.HeadersVisibility.Row },
            { header: 'All', value: wjGrid.HeadersVisibility.All }
        ]
    });
    // initialize value
    headersVisibilityMenu.selectedValue = wjGrid.HeadersVisibility.All;
    // create show selected headers menu
    let showSelectedHeadersMenu = new wjInput.Menu('#showSelectedHeadersMenu', {
        // update header to show current selection
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                theGrid.showSelectedHeaders = s.selectedValue;
            }
        },
        header: 'Show Selected Headers',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'None', value: wjGrid.HeadersVisibility.None },
            { header: 'Column', value: wjGrid.HeadersVisibility.Column },
            { header: 'Row', value: wjGrid.HeadersVisibility.Row },
            { header: 'All', value: wjGrid.HeadersVisibility.All }
        ]
    });
    // initialize value
    showSelectedHeadersMenu.selectedValue = wjGrid.HeadersVisibility.None;
    // create Show Marquee menu
    let showMarqueeMenu = new wjInput.Menu('#showMarqueeMenu', {
        // update header to show current selection
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                theGrid.showMarquee = s.selectedValue;
            }
        },
        header: 'Show Marquee',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'On', value: true },
            { header: 'Off', value: false }
        ]
    });
    // initialize value
    showMarqueeMenu.selectedValue = false;
    // create Data Maps menu
    let dataMapsMenu = new wjInput.Menu('#dataMapsMenu', {
        // update header to show current selection
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                updateDataMaps(s.selectedValue);
            }
        },
        header: 'Data Maps',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'On', value: true },
            { header: 'Off', value: false }
        ]
    });
    // initialize value
    dataMapsMenu.selectedValue = true;
    // create Formatting menu
    let formattingMenu = new wjInput.Menu('#formattingMenu', {
        // update header to show current selection
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                updateFormatting(s.selectedValue);
            }
        },
        header: 'Formatting',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'On', value: true },
            { header: 'Off', value: false }
        ]
    });
    // initialize value
    formattingMenu.selectedValue = true;
    document.querySelector('#toggleColumnVisibility').addEventListener('click', () => {
        let col = theGrid.columns[0];
        col.visible = !col.visible;
    });
    document.querySelector('#changeColumnSize').addEventListener('click', () => {
        let col = theGrid.columns[0];
        col.visible = true;
        col.width = col.width < 0 ? 60 : -1;
        col = theGrid.rowHeaders.columns[0];
        col.width = col.width < 0 ? 40 : -1;
    });
    document.querySelector('#toggleRowVisibility').addEventListener('click', () => {
        let row = theGrid.rows[0];
        row.visible = !row.visible;
    });
    document.querySelector('#changeRowSize').addEventListener('click', () => {
        let row = theGrid.rows[0];
        row.visible = true;
        row.height = row.height < 0 ? 80 : -1;
        row = theGrid.columnHeaders.rows[0];
        row.height = row.height < 0 ? 80 : -1;
    });
    document.querySelector('#changeDefaultRowSize').addEventListener('click', () => {
        theGrid.rows.defaultSize = theGrid.rows.defaultSize == 28 ? 65 : 28;
    });
    document.querySelector('#changeScrollPosition').addEventListener('click', () => {
        if (theGrid.scrollPosition.y == 0) {
            var sz = theGrid.scrollSize;
            theGrid.scrollPosition = new wjCore.Point(-sz.width / 2, -sz.height / 2);
        }
        else {
            theGrid.scrollPosition = new wjCore.Point(0, 0);
        }
    });
    function formatMenuHeader(menu) {
        let index = menu.header.indexOf(':');
        if (index !== -1) {
            menu.header = menu.header.substring(0, menu.header.indexOf(':')) + wjCore.format(': <b>{header}</b>', menu.selectedItem);
        }
        else {
            menu.header = menu.header + wjCore.format(': <b>{header}</b>', menu.selectedItem);
        }
    }
    // apply/remove data maps
    function updateDataMaps(dataMaps) {
        if (theGrid) {
            var colCountry = theGrid.columns.getColumn('countryId');
            var colProduct = theGrid.columns.getColumn('productId');
            var colColor = theGrid.columns.getColumn('colorId');
            if (colCountry && colProduct && colColor) {
                if (dataMaps) {
                    colCountry.showDropDown = true; // show drop-down for countries
                    colProduct.showDropDown = false; // don't show it for products
                    colColor.showDropDown = false; // or colors (just to show how)
                    colCountry.dataMap = buildDataMap(getCountries());
                    colProduct.dataMap = buildDataMap(getProducts());
                    colColor.dataMap = buildDataMap(getColors());
                }
                else {
                    colCountry.dataMap = null;
                    colProduct.dataMap = null;
                    colColor.dataMap = null;
                }
            }
        }
    }
    // build a data map from a string array using the indices as keys
    function buildDataMap(items) {
        var map = [];
        for (var i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjGrid.DataMap(map, 'key', 'value');
    }
    // apply/remove column formatting
    function updateFormatting(fmt) {
        if (theGrid) {
            setColumnFormat('amount', fmt ? 'c' : null);
            setColumnFormat('amount2', fmt ? 'c' : null);
            setColumnFormat('discount', fmt ? 'p0' : null);
            setColumnFormat('start', fmt ? 'MMM d yy' : null);
            setColumnFormat('end', fmt ? 'HH:mm' : null);
        }
    }
    function setColumnFormat(name, format) {
        var col = theGrid.columns.getColumn(name);
        if (col) {
            col.format = format;
        }
    }
    function formatCellRange(cellRange) {
        let rng;
        rng = '(' + cellRange.row + ';' + cellRange.col + ')';
        if (!cellRange.isSingleCell) {
            rng += '-(' + cellRange.row2 + ';' + cellRange.col2 + ')';
        }
        return rng;
    }
}
