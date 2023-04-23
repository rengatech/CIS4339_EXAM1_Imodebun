
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Weather'],
    [ 2000,      2],
    [ 2002,      5],
    [ 2004,     6],
    [ 2006,     10],
    [ 2011,      15],
    [ 2016,    7]
  ]);

  var options = {
    title: 'Year vs. Weather',
    hAxis: {title: 'Year', minValue: 2000, maxValue: 2020},
    vAxis: {title: 'Weather', minValue: 0, maxValue: 20 },
    legend: 'none',
    crosshair: { trigger: 'both', orientation: 'both' },
    trendlines: {
      0: {
        type: 'exponential',
        degree: 3,
        visibleInLegend: true,
      }
    }
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('polynomial2_div'));
  chart.draw(data, options);
}
