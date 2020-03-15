Chaining Filters
================

The **CollectionView.filter** property allows you to specify one filtering function for the
collection. You can use the results of one filter to create a secondary filter.

This is called chaining and it can be done using another CollectionView, as shown in this
example.

You can also use the **CollectionView.filters** property to add multiple filter funtions
to the view. This is a new option that is usually simpler and more efficient than 
chaining filters.