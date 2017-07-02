# live-stocks

The app is super simple, has a node[express] backend that emits some random stocks data every 10 seconds and a front end that displays it in the form of a chart and a table. 

the whole project is divided into two parts : 

live-stocks-client : An angular 2 app, driven by highcharts and bootstrap, which displays the stock data in the form of a highcharts line chart and a table. 

live-stocks-server : a namesake server, running on express, using websockets to create a ws server, that broadcasts some random stock data every 10 seconds. 

You can access the live app directly @ https://immense-basin-28669.herokuapp.com/

Here's how the chart looks : 

![Line Chart for stock updates](https://preview.ibb.co/gFcQ9a/live_stocks_chart.png)

And the table : 

![Table for stock updates](https://preview.ibb.co/e95TUa/live_stocks_table.png)

Wanna run this locally ? Just : 

1. download the repo
2. hit npm install in both the folders
3. hit ng serve in the live-stocks-client app
4. hit nodemon app.js in the live-stocks-server. 

And you're good to go.
