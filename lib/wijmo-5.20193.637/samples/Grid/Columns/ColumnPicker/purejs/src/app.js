import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { showPopup, hidePopup, hasClass, contains, closest } from '@grapecity/wijmo';
import { ListBox } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // generate some random data
    var data = [], countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'], products = ['Widget', 'Sprocket', 'Gadget', 'Doohickey'], colors = ['Black', 'White', 'Red', 'Green', 'Blue'], dt = new Date();
    for (var i = 0; i < 100; i++) {
        var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60), countryId = Math.floor(Math.random() * countries.length), productId = Math.floor(Math.random() * products.length), colorId = Math.floor(Math.random() * colors.length);
        var item = {
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
    // create the grid
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: data,
        formatItem: function (s, e) {
            if (e.panel == s.topLeftCells) {
                e.cell.innerHTML = '<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
            }
        }
    });
    // create the column picker
    var theColumnPicker = new ListBox('#theColumnPicker', {
        itemsSource: theGrid.columns,
        checkedMemberPath: 'visible',
        displayMemberPath: 'header',
        lostFocus: function () {
            hidePopup(theColumnPicker.hostElement);
        }
    });
    // show the column picker when the user clicks the top-left cell
    var ref = theGrid.hostElement.querySelector('.wj-topleft');
    ref.addEventListener('mousedown', function (e) {
        if (hasClass(e.target, 'column-picker-icon')) {
            let host = theColumnPicker.hostElement;
            if (!host.offsetHeight) {
                showPopup(host, ref, false, true, false);
                theColumnPicker.focus();
            }
            else {
                hidePopup(host, true, true);
                theGrid.focus();
            }
            e.preventDefault();
        }
    });
    // work around Safari/IOS bug (TFS 321525, 361500, 402670)
    // https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
    window.addEventListener('touchstart', (e) => {
        let host = theColumnPicker.hostElement;
        if (!contains(host, e.target) && !closest(e.target, '.wj-flexgrid')) {
            hidePopup(host, true, true);
        }
    });
    // save/restore layout buttons
    document.getElementById('btnSave').addEventListener('click', function () {
        localStorage.setItem('myLayout', theGrid.columnLayout);
    });
    document.getElementById('btnRestore').addEventListener('click', function () {
        var layout = localStorage.getItem('myLayout');
        if (layout) {
            theGrid.columnLayout = layout;
        }
    });
}
