Multi-Range Selection
=====================

Set the FlexGrid's **selectionMode** property to **MultiRange** to enable
Excel-style multi-range selection.

Users will be able to select multiple ranges by ctrl-clicking and dragging
on the grid.

The **selectedRanges** property gets an array containing **CellRange**
objects that contain the currently selected ranges.

The sample shows how you can provide Excel-style dynamic data summaries 
for the current selection (regular or multi-range).

It also shows how you can export selected ranges to CSV files.

Note that clipboard and export commands only work for multi-range selections 
if all selected ranges refer to the same column range or to the same row range.
(Excel also behaves this way.)
