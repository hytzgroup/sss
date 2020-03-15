Sorting Columns
===============

The **FlexGrid** control relies on the **CollectionView** class for sorting data. 

Use the grid's **allowSorting** property to determine whether users 
should be able to sort the grid by clicking the column header cells:

**AllowSorting.None**: Users cannot sort the grid by clicking the column headers.

**AllowSorting.SingleColumn**: Users may sort the grid by a single column at a time.
Clicking the column header sorts the column or flips the sort direction.
Ctrl+Click removes the sort.
(This is the default setting.)

**AllowSorting.MultiColumn**: Users may sort the grid by multiple columns at a time.
Clicking the column header sorts the column or flips the sort direction.
Ctrl+Click removes the sort for that column.
Ctrl+Shift+Click removes all sorts.
