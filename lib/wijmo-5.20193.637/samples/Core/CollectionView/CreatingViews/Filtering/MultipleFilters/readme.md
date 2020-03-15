Multiple Filter Functions
=========================

The **CollectionView.filters** property contains an array of filter functions.

To be included in the view, items must satisfy the main **filter** function and all the functions in
the **filters** array.

The **filters** property allows components to create and manage their own independent filter functions. 

The sample below uses the **filters** array to filter data by country, independently of the column
filtering provided by the **FlexGridFilter**.
