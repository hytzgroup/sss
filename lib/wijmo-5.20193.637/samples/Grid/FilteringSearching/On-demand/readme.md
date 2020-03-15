On-Demand Sorting
=================

The **FlexGrid** relies on the **CollectionView** class to perform data operations
including sorting, filtering, grouping, paging, change tracking, etc.

By default, the **CollectionView** re-applies the filter after any edits.
You can change that behavior by setting the **refreshOnEdit** property to false.

If you do that, the **CollectionView** will not apply the filter when you edit items.
It will re-apply filter only on demand, when the user edits the filter conditions.