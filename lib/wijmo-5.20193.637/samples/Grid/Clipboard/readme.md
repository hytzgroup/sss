Clipboard Support
=================

The FlexGrid has built-in clipboard support. 

By default, pressing the ctrl+c or ctrl+Insert keys copies the current selection to the clipboard.
Pressing ctrl+v or shift-Insert pastes the clipboard content into the grid.
You can customize the clipboard actions using the **copying**, **copied**, **pasting**, **pasted**,
**pastingCell**, and **pastedCell** events.

You can disable the automatic clipboard support by setting the **autoClipboard** property
to false.

The FlexGrid implements an Excel-style 'smart pasting' feature that replicates the
clipboard data when pasting.
For example, if you select a single cell and press ctrl+c to copy it to the clipboard,
then extend the selection and press ctrl+v to paste, the cell will be pasted over the
entire selection.

Use the **copyHeaders** property to control whether the grid should include header cells
when copying the content to the clipboard. This is especially useful in read-only grids.