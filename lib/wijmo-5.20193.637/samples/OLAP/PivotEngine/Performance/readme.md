PivotEngine Performance
=======================

The **PivotEngine** can summarize large data sets, either on the client or on the server.
Either way, data summaries are generated asynchronously, so the UI remains responsive while
the data is being summarized.

This example demonstrates performance by showing the time it takes to summarize client-side
data sets of different sizes.

If your data sets are really large (millions of records), you should consider using 
server-side OLAP providers like SSAS cubes or ComponentOne Data Services.
The **PivotEngine** can connect to either.

