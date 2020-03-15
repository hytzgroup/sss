Custom Aggregates
=================

The FlexGrid columns have an **aggregate** property that allows you to show data summaries 
for the whole grid or for each group.
If the built-in aggregates are not enough, you can calculate also aggregates with custom code.
The grid below includes a 'Profit' column that shows the difference between 'Sales' and 'Expenses'. 

The 'Profit' column is calculated in the **formatItem** event. The profit for regular data
items is based on the actual data items. The profit for groups is calculated using the 
group's **getAggregate** method.

The 'Profit' column cannot be sorted because it is calculated dynamically, and does not belong
to the data items.

