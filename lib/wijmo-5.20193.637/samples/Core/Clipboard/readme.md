Clipboard
=========

The **FlexGrid** supports the clipboard by default. 
Pressing ctrl+C copies the current selection to the clipboard, and ctrl+V pastes
the clipboard content at the current cursor position.

You can disable the automatic clipboard by setting the **autoClipboard** property to false.

You can use the **copyHeaders** property to determined whether clip strings should
include the content of the header cells. 
This is especially useful in read-only grids, because the header information 
typically should not be included when pasting data into the grid.

Try to copy a range from the __FlexGrid__ and paste into Notepad or
into an Excel sheet.