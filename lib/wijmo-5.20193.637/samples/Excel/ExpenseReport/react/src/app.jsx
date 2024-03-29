import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcXlsx from '@grapecity/wijmo.xlsx';
import { getEmployeesWithExpences } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getEmployeesWithExpences()
        };
    }
    render() {
        return <div className="container-fluid">
			<div className="row">
				<button onClick={this.saveExpenses.bind(this)} className="btn btn-default">Save Report</button>
			</div>
		</div>;
    }
    saveExpenses() {
        let workbook = this._exportExpenseReport(this.state.data);
        workbook.saveAsync('ExpenseReport.xlsx');
    }
    _exportExpenseReport(employees) {
        var book = new wjcXlsx.Workbook();
        var dateFormat = wjcXlsx.Workbook.toXlsxDateFormat('d'), stdNumWidth = 85, simpleCaptionStyle = new wjcXlsx.WorkbookStyle(), accentCaptionStyle = new wjcXlsx.WorkbookStyle(), totalCaptionStyle = new wjcXlsx.WorkbookStyle(), valueStyle = new wjcXlsx.WorkbookStyle(), highlightedValueStyle = new wjcXlsx.WorkbookStyle(), tableHeaderStyle = new wjcXlsx.WorkbookStyle(), tableFooterCurrencyStyle = new wjcXlsx.WorkbookStyle(), tableValueStyle = new wjcXlsx.WorkbookStyle(), tableDateStyle = new wjcXlsx.WorkbookStyle(), tableCurrencyStyle = new wjcXlsx.WorkbookStyle(), tableIntegerStyle = new wjcXlsx.WorkbookStyle();
        simpleCaptionStyle.hAlign = wjcXlsx.HAlign.Right;
        accentCaptionStyle.font = new wjcXlsx.WorkbookFont();
        accentCaptionStyle.font.color = '#808097';
        totalCaptionStyle.basedOn = simpleCaptionStyle;
        totalCaptionStyle.font = new wjcXlsx.WorkbookFont();
        totalCaptionStyle.font.bold = true;
        totalCaptionStyle.hAlign = wjcXlsx.HAlign.Right;
        valueStyle.font = new wjcXlsx.WorkbookFont();
        valueStyle.font.family = 'Arial';
        highlightedValueStyle.basedOn = valueStyle;
        highlightedValueStyle.fill = new wjcXlsx.WorkbookFill();
        highlightedValueStyle.fill.color = '#e1e1e1';
        tableHeaderStyle.font = new wjcXlsx.WorkbookFont();
        tableHeaderStyle.font.bold = true;
        tableHeaderStyle.fill = new wjcXlsx.WorkbookFill();
        tableHeaderStyle.fill.color = '#fad9cd';
        tableFooterCurrencyStyle.basedOn = tableHeaderStyle;
        tableFooterCurrencyStyle.format = wjcXlsx.Workbook.toXlsxNumberFormat('c2');
        tableFooterCurrencyStyle.hAlign = wjcXlsx.HAlign.Right;
        tableValueStyle.fill = new wjcXlsx.WorkbookFill();
        tableValueStyle.fill.color = '#f4b19b';
        tableDateStyle.basedOn = tableValueStyle;
        tableCurrencyStyle.basedOn = tableValueStyle;
        tableCurrencyStyle.format = wjcXlsx.Workbook.toXlsxNumberFormat('c2');
        tableIntegerStyle.basedOn = tableValueStyle;
        tableIntegerStyle.format = wjcXlsx.Workbook.toXlsxNumberFormat('00');
        for (var emplIdx = 0; emplIdx < employees.length; emplIdx++) {
            var empl = employees[emplIdx], sheet = new wjcXlsx.WorkSheet(), rows = sheet.rows;
            book.sheets.push(sheet);
            sheet.name = empl.Name;
            sheet.columns[0] = new wjcXlsx.WorkbookColumn();
            sheet.columns[0].width = '1ch';
            sheet.columns[1] = new wjcXlsx.WorkbookColumn();
            sheet.columns[1].width = 100;
            sheet.columns[2] = new wjcXlsx.WorkbookColumn();
            sheet.columns[2].width = 200;
            sheet.columns[3] = new wjcXlsx.WorkbookColumn();
            sheet.columns[3].width = stdNumWidth;
            sheet.columns[4] = new wjcXlsx.WorkbookColumn();
            sheet.columns[4].width = stdNumWidth;
            sheet.columns[6] = new wjcXlsx.WorkbookColumn();
            sheet.columns[6].width = stdNumWidth;
            sheet.columns[7] = new wjcXlsx.WorkbookColumn();
            sheet.columns[7].width = stdNumWidth;
            sheet.columns[8] = new wjcXlsx.WorkbookColumn();
            sheet.columns[8].width = 130;
            sheet.columns[9] = new wjcXlsx.WorkbookColumn();
            sheet.columns[9].width = 130;
            sheet.columns[10] = new wjcXlsx.WorkbookColumn();
            sheet.columns[10].width = stdNumWidth;
            //============= Report header - Employee data =========================
            rows[0] = new wjcXlsx.WorkbookRow();
            rows[0].cells[8] = new wjcXlsx.WorkbookCell();
            rows[0].cells[8].colSpan = 3;
            rows[0].cells[8].value = 'For Office Use Only';
            rows[0].cells[8].style = new wjcXlsx.WorkbookStyle();
            rows[0].cells[8].style.basedOn = highlightedValueStyle;
            rows[0].cells[8].style.font = new wjcXlsx.WorkbookFont();
            rows[0].cells[8].style.font.italic = true;
            rows[1] = new wjcXlsx.WorkbookRow();
            rows[1].height = 45;
            rows[1].cells[1] = new wjcXlsx.WorkbookCell();
            rows[1].cells[1].value = 'Expense Report';
            rows[1].cells[1].link = 'A1:B1';
            rows[1].cells[1].colSpan = 3;
            rows[1].cells[1].style = new wjcXlsx.WorkbookStyle();
            rows[1].cells[1].style.basedOn = accentCaptionStyle;
            rows[1].cells[1].style.font = new wjcXlsx.WorkbookFont();
            rows[1].cells[1].style.font.size = 32;
            rows[1].cells[1].style.font.bold = true;
            rows[2] = new wjcXlsx.WorkbookRow();
            rows[2].cells[1] = new wjcXlsx.WorkbookCell();
            rows[2].cells[1].value = 'PURPOSE:';
            rows[2].cells[1].style = accentCaptionStyle;
            rows[2].cells[2] = new wjcXlsx.WorkbookCell();
            rows[2].cells[2].value = empl.Purpose;
            rows[2].cells[5] = new wjcXlsx.WorkbookCell();
            rows[2].cells[5].value = 'Attachment:';
            rows[2].cells[5].style = accentCaptionStyle;
            rows[2].cells[6] = new wjcXlsx.WorkbookCell();
            rows[2].cells[6].value = empl.Attachment;
            rows[5] = new wjcXlsx.WorkbookRow();
            rows[5].cells[1] = new wjcXlsx.WorkbookCell();
            rows[5].cells[1].value = 'EMPLOYEE IMFORMATION:';
            rows[5].cells[1].style = accentCaptionStyle;
            rows[5].cells[1].colSpan = 2;
            rows[6] = new wjcXlsx.WorkbookRow();
            rows[6].cells[1] = new wjcXlsx.WorkbookCell();
            rows[6].cells[1].value = 'Name';
            rows[6].cells[1].link = 'https://cn.bing.com/';
            rows[6].cells[1].style = simpleCaptionStyle;
            rows[6].cells[2] = new wjcXlsx.WorkbookCell();
            rows[6].cells[2].value = empl.Name;
            rows[6].cells[5] = new wjcXlsx.WorkbookCell();
            rows[6].cells[5].value = 'Position';
            rows[6].cells[5].style = simpleCaptionStyle;
            rows[6].cells[6] = new wjcXlsx.WorkbookCell();
            rows[6].cells[6].value = empl.Position;
            rows[6].cells[9] = new wjcXlsx.WorkbookCell();
            rows[6].cells[9].value = 'SSN';
            rows[6].cells[9].style = simpleCaptionStyle;
            rows[6].cells[10] = new wjcXlsx.WorkbookCell();
            rows[6].cells[10].value = empl.SSN;
            rows[7] = new wjcXlsx.WorkbookRow();
            rows[7].cells[1] = new wjcXlsx.WorkbookCell();
            rows[7].cells[1].value = 'Department';
            rows[7].cells[1].style = simpleCaptionStyle;
            rows[7].cells[2] = new wjcXlsx.WorkbookCell();
            rows[7].cells[2].value = empl.Department;
            rows[7].cells[5] = new wjcXlsx.WorkbookCell();
            rows[7].cells[5].value = 'Manager';
            rows[7].cells[5].style = simpleCaptionStyle;
            rows[7].cells[6] = new wjcXlsx.WorkbookCell();
            rows[7].cells[6].value = empl.Manager;
            rows[7].cells[9] = new wjcXlsx.WorkbookCell();
            rows[7].cells[9].value = 'Employee ID';
            rows[7].cells[9].style = simpleCaptionStyle;
            rows[7].cells[10] = new wjcXlsx.WorkbookCell();
            rows[7].cells[10].value = empl.Id;
            //================ Expense items table ==========================
            // Table header
            rows[9] = new wjcXlsx.WorkbookRow();
            rows[9].style = new wjcXlsx.WorkbookStyle();
            rows[9].style.hAlign = wjcXlsx.HAlign.Center;
            rows[9].cells[1] = new wjcXlsx.WorkbookCell();
            rows[9].cells[1].value = 'Date';
            rows[9].cells[1].style = tableHeaderStyle;
            rows[9].cells[2] = new wjcXlsx.WorkbookCell();
            rows[9].cells[2].value = 'Decsription';
            rows[9].cells[2].style = tableHeaderStyle;
            rows[9].cells[3] = new wjcXlsx.WorkbookCell();
            rows[9].cells[3].value = 'Hotel';
            rows[9].cells[3].style = tableHeaderStyle;
            rows[9].cells[4] = new wjcXlsx.WorkbookCell();
            rows[9].cells[4].value = 'Transport';
            rows[9].cells[4].style = tableHeaderStyle;
            rows[9].cells[5] = new wjcXlsx.WorkbookCell();
            rows[9].cells[5].value = 'Fuel';
            rows[9].cells[5].style = tableHeaderStyle;
            rows[9].cells[6] = new wjcXlsx.WorkbookCell();
            rows[9].cells[6].value = 'Meal';
            rows[9].cells[6].style = tableHeaderStyle;
            rows[9].cells[7] = new wjcXlsx.WorkbookCell();
            rows[9].cells[7].value = 'Misc';
            rows[9].cells[7].style = tableHeaderStyle;
            rows[9].cells[8] = new wjcXlsx.WorkbookCell();
            rows[9].cells[8].value = 'Parking (per hour)';
            rows[9].cells[8].style = tableHeaderStyle;
            rows[9].cells[9] = new wjcXlsx.WorkbookCell();
            rows[9].cells[9].value = 'Parking (hours)';
            rows[9].cells[9].style = tableHeaderStyle;
            rows[9].cells[10] = new wjcXlsx.WorkbookCell();
            rows[9].cells[10].value = 'Total';
            rows[9].cells[10].style = tableHeaderStyle;
            // Table items
            var expenses = empl.Expenses, firstIdx = 10, totalIdx = firstIdx + expenses.length;
            for (var i = 0; i < expenses.length; i++) {
                var curExpense = expenses[i], rowIdx = firstIdx + i;
                rows[rowIdx] = new wjcXlsx.WorkbookRow();
                rows[rowIdx].cells[1] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[1].value = curExpense.Date;
                rows[rowIdx].cells[1].style = tableDateStyle;
                rows[rowIdx].cells[2] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[2].value = curExpense.Decsription;
                rows[rowIdx].cells[2].style = tableCurrencyStyle;
                rows[rowIdx].cells[3] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[3].value = curExpense.Hotel;
                rows[rowIdx].cells[3].style = tableCurrencyStyle;
                rows[rowIdx].cells[4] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[4].value = curExpense.Transport;
                rows[rowIdx].cells[4].style = tableCurrencyStyle;
                rows[rowIdx].cells[5] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[5].value = curExpense.Fuel;
                rows[rowIdx].cells[5].style = tableCurrencyStyle;
                rows[rowIdx].cells[6] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[6].value = curExpense.Meal;
                rows[rowIdx].cells[6].style = tableCurrencyStyle;
                rows[rowIdx].cells[7] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[7].value = curExpense.Misc;
                rows[rowIdx].cells[7].style = tableCurrencyStyle;
                rows[rowIdx].cells[8] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[8].value = curExpense.ParkingRate;
                rows[rowIdx].cells[8].style = tableCurrencyStyle;
                rows[rowIdx].cells[9] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[9].value = curExpense.ParkingHours;
                rows[rowIdx].cells[9].style = tableIntegerStyle;
                rows[rowIdx].cells[10] = new wjcXlsx.WorkbookCell();
                rows[rowIdx].cells[10].formula = 'SUM(' + wjcXlsx.Workbook.xlsxAddress(rowIdx, 3) + ':' + wjcXlsx.Workbook.xlsxAddress(rowIdx, 7) + ')+' +
                    wjcXlsx.Workbook.xlsxAddress(rowIdx, 8) + '*' + wjcXlsx.Workbook.xlsxAddress(rowIdx, 9);
                rows[rowIdx].cells[10].style = tableCurrencyStyle;
            }
            // Totals row
            var totalColumnIndexes = [3, 4, 5, 6, 7, 10];
            rows[totalIdx] = new wjcXlsx.WorkbookRow();
            rows[totalIdx].cells[1] = new wjcXlsx.WorkbookCell();
            rows[totalIdx].cells[1].value = 'Total';
            rows[totalIdx].cells[1].style = tableHeaderStyle;
            for (var ti in totalColumnIndexes) {
                var ci = totalColumnIndexes[ti];
                rows[totalIdx].cells[ci] = new wjcXlsx.WorkbookCell();
                rows[totalIdx].cells[ci].formula = 'sum(' + wjcXlsx.Workbook.xlsxAddress(firstIdx, ci) + ':' + wjcXlsx.Workbook.xlsxAddress(totalIdx - 1, ci) + ')';
                rows[totalIdx].cells[ci].style = tableFooterCurrencyStyle;
            }
            rows[totalIdx].cells[8] = new wjcXlsx.WorkbookCell();
            rows[totalIdx].cells[8].formula = 'SUMPRODUCT(' + wjcXlsx.Workbook.xlsxAddress(firstIdx, 7) + ':' + wjcXlsx.Workbook.xlsxAddress(totalIdx - 1, 7) + ',' +
                wjcXlsx.Workbook.xlsxAddress(firstIdx, 8) + ':' + wjcXlsx.Workbook.xlsxAddress(totalIdx - 1, 8) + ')';
            rows[totalIdx].cells[8].colSpan = 2;
            rows[totalIdx].cells[8].style = tableFooterCurrencyStyle;
            rows[totalIdx].cells[2] = new wjcXlsx.WorkbookCell();
            rows[totalIdx].cells[2].style = tableHeaderStyle;
            // From/To dates in header, via MAX/MIN formulas on Date field
            rows[2].cells[8] = new wjcXlsx.WorkbookCell();
            rows[2].cells[8].value = 'PAY PERIOD:';
            rows[2].cells[8].style = accentCaptionStyle;
            rows[2].cells[9] = new wjcXlsx.WorkbookCell();
            rows[2].cells[9].value = 'From';
            rows[2].cells[9].style = simpleCaptionStyle;
            var datesRange = wjcXlsx.Workbook.xlsxAddress(firstIdx, 1, true) + ':' + wjcXlsx.Workbook.xlsxAddress(totalIdx - 1, 1, true);
            rows[2].cells[10] = new wjcXlsx.WorkbookCell();
            rows[2].cells[10].formula = 'MIN(' + datesRange + ')';
            rows[2].cells[10].style = new wjcXlsx.WorkbookStyle();
            rows[2].cells[10].style.format = dateFormat;
            rows[3] = new wjcXlsx.WorkbookRow();
            rows[3].cells[9] = new wjcXlsx.WorkbookCell();
            rows[3].cells[9].value = 'To';
            rows[3].cells[9].style = simpleCaptionStyle;
            rows[3].cells[10] = new wjcXlsx.WorkbookCell();
            rows[3].cells[10].formula = 'MAX(' + datesRange + ')';
            rows[3].cells[10].style = new wjcXlsx.WorkbookStyle();
            rows[3].cells[10].style.format = dateFormat;
            //============ Report footer - totals and misc fields
            var footerIdx = totalIdx + 1;
            rows[footerIdx] = new wjcXlsx.WorkbookRow();
            rows[footerIdx].cells[9] = new wjcXlsx.WorkbookCell();
            rows[footerIdx].cells[9].value = 'Subtotal';
            rows[footerIdx].cells[9].style = totalCaptionStyle;
            rows[footerIdx].cells[10] = new wjcXlsx.WorkbookCell();
            rows[footerIdx].cells[10].formula = wjcXlsx.Workbook.xlsxAddress(footerIdx + 2, 10) + '-' + wjcXlsx.Workbook.xlsxAddress(footerIdx + 1, 10);
            rows[footerIdx].cells[10].style = new wjcXlsx.WorkbookStyle();
            rows[footerIdx].cells[10].style.format = wjcXlsx.Workbook.toXlsxNumberFormat('c2');
            rows[footerIdx + 1] = new wjcXlsx.WorkbookRow();
            rows[footerIdx + 1].cells[9] = new wjcXlsx.WorkbookCell();
            rows[footerIdx + 1].cells[9].value = 'Cash Advance';
            rows[footerIdx + 1].cells[9].style = totalCaptionStyle;
            rows[footerIdx + 1].cells[10] = new wjcXlsx.WorkbookCell();
            rows[footerIdx + 1].cells[10].value = empl.Advance;
            rows[footerIdx + 1].cells[10].style = new wjcXlsx.WorkbookStyle();
            rows[footerIdx + 1].cells[10].style.format = wjcXlsx.Workbook.toXlsxNumberFormat('c2');
            rows[footerIdx + 2] = new wjcXlsx.WorkbookRow();
            rows[footerIdx + 2].cells[9] = new wjcXlsx.WorkbookCell();
            rows[footerIdx + 2].cells[9].value = 'Total';
            rows[footerIdx + 2].cells[9].style = totalCaptionStyle;
            rows[footerIdx + 2].cells[10] = new wjcXlsx.WorkbookCell();
            rows[footerIdx + 2].cells[10].formula = wjcXlsx.Workbook.xlsxAddress(totalIdx, 10);
            rows[footerIdx + 2].cells[10].style = new wjcXlsx.WorkbookStyle();
            rows[footerIdx + 2].cells[10].style.format = wjcXlsx.Workbook.toXlsxNumberFormat('c2');
            rows[footerIdx + 3] = new wjcXlsx.WorkbookRow();
            rows[footerIdx + 3].cells[1] = new wjcXlsx.WorkbookCell();
            rows[footerIdx + 3].cells[1].value = 'APPROVED:';
            rows[footerIdx + 3].cells[1].style = accentCaptionStyle;
            rows[footerIdx + 3].cells[4] = new wjcXlsx.WorkbookCell();
            rows[footerIdx + 3].cells[4].value = 'NOTES:';
            rows[footerIdx + 3].cells[4].style = accentCaptionStyle;
        }
        return book;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
