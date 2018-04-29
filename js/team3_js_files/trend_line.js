var height = 300;
var width = 800;
var margin = {top: 20, right:20, bottom: 50, left: 20};

// formatters for axis and labels
var date_format = d3.format(" ");
var count_format = d3.format(" ");

var svg = d3.select("body")
  .append("svg")
  .attr("width", 900)
  .attr("height", height + margin.top + margin.bottom)
  .attr("transform", "translate(" + (20) + "," + (margin.top-550) + ")");

svg.append("g")
  .attr("class", "y axis");

svg.append("g")
  .attr("class", "x axis");

var xScale = d3.scale.ordinal()
  .rangeRoundBands([margin.left, width], .1);

var yScale = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

d3.csv("../../data_files/ufo_years.csv", function(data) {

  // extract the x labels for the axis and scale domain
  var xLabels = data.map(function (d) { return d['year']; })

  xScale.domain(xLabels);
  yScale.domain([0, Math.round(d3.max(data, function(d) { return parseFloat(d['count']); }))]);

  var line = d3.svg.line()
    .x(function(d) { return xScale(d['year']); })
    .y(function(d) { return yScale(d['count']); });

  svg.append("path")
    .datum(data)
    .attr("class","line")
    .attr("d", line)
    .attr("transform","translate(60,0)");

  svg.select(".x.axis")
    .attr("transform", "translate(60," + (height) + ")")
    .call(xAxis.tickValues(xLabels.filter(function(d, i) {
      if (i % 12 == 0)
        return d;
      })))
    .selectAll("text")
    .style("text-anchor","end")
    .attr("transform", function(d) {
      return "rotate(-45)";
    });

  svg.select(".y.axis")
    .attr("transform", "translate(" + 80 + ",0)")
    .call(yAxis.tickFormat(date_format));

  // chart title
  svg.append("text")
    .attr("x", (width + (margin.left + margin.right) )/ 2)
    .attr("y", 0 + margin.top)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-family", "sans-serif")
    .text("USA-UFO Sightings over years");

  // x axis label
  svg.append("text")
    .attr("x", (width + (margin.left + margin.right) )/ 2)
    .attr("y", height + margin.bottom)
    .style("font-size","15px")
    .attr("class", "text-label")
    .attr("text-anchor", "middle")
    .text("Years ----------------->");


    // y axis label
    svg.append("text")
      .attr('transform', 'translate(30,140)rotate(-90)')
      .style("font-size","15px")
      .attr("class", "text-label")
      .attr("text-anchor", "middle")
      .text("Number of UFO Sightings------------->");

  // get the x and y values for least squares
  var xSeries = d3.range(1, xLabels.length + 1);
  var ySeries = data.map(function(d) { return parseFloat(d['count']); });

  var leastSquaresCoeff = leastSquares(xSeries, ySeries);

  // apply the reults of the least squares regression
  var x1 = xLabels[0];
  var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
  var x2 = xLabels[xLabels.length - 1];
  var y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
  var trendData = [[x1,y1,x2,y2]];

  var trendline = svg.selectAll(".trendline")
    .data(trendData);

  // trendline.enter()
  //   .append("line")
  //   .attr("class", "trendline")
  //   .attr("x1", function(d) { return xScale(d[0]); })
  //   .attr("y1", function(d) { return yScale(d[1]); })
  //   .attr("x2", function(d) { return xScale(d[2]); })
  //   .attr("y2", function(d) { return yScale(d[3]); })
  //   .attr("stroke", "red")
  //   .attr("stroke-width", 3);

});

// returns slope, intercept and r-square of the line
function leastSquares(xSeries, ySeries) {
  var reduceSumFunc = function(prev, cur) { return prev + cur; };

  var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
  var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

  var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
    .reduce(reduceSumFunc);

  var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
    .reduce(reduceSumFunc);

  var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
    .reduce(reduceSumFunc);

  var slope = ssXY / ssXX;
  var intercept = yBar - (xBar * slope);
  var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);

  return [slope, intercept, rSquare];
}
