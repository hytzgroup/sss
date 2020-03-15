On-Demand Sorting
=================

The **FlexGrid** relies on the **CollectionView** class to perform data operations
including sorting, filtering, grouping, paging, change tracking, etc.

By default, the **CollectionView** refreshes and re-sorts the data after any edits.
You can change that behavior by setting the **refreshOnEdit** property to false.

If you do that, the **CollectionView** will no longer re-sort the data when you 
edit items. It will sort only on demand, when the user clicks a column header cell.