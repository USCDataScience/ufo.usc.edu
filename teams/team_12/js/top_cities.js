function addAxesAndLegend (svg, xAxis, yAxis, margin, chartWidth, chartHeight) {
  var legendWidth  = 200,
      legendHeight = 100;

  // clipping to make sure nothing appears behind legend
  svg.append('clipPath')
    .attr('id', 'axes-clip')
    .append('polygon')
      .attr('points', (-margin.left)                 + ',' + (-margin.top)                 + ' ' +
                      (chartWidth - legendWidth - 1) + ',' + (-margin.top)                 + ' ' +
                      (chartWidth - legendWidth - 1) + ',' + legendHeight                  + ' ' +
                      (chartWidth + margin.right)    + ',' + legendHeight                  + ' ' +
                      (chartWidth + margin.right)    + ',' + (chartHeight + margin.bottom) + ' ' +
                      (-margin.left)                 + ',' + (chartHeight + margin.bottom));

  var axes = svg.append('g')
    .attr('clip-path', 'url(#axes-clip)');

  axes.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(xAxis);

  axes.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('UFO sighting counts');

  var legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + (chartWidth - legendWidth) + ', 0)');

  legend.append('rect')
    .attr('class', 'legend-bg')
    .attr('width',  legendWidth)
    .attr('height', legendHeight);

  legend.append('rect')
    .attr('class', 'median-line')
    .attr('width',  75)
    .attr('height', 20)
    .attr('x', 10)
    .attr('y', 10);

  legend.append('text')
    .attr('x', 115)
    .attr('y', 25)
    .text('LosAngeles');

  legend.append('rect')
    .attr('class', 'line1')
    .attr('width',  75)
    .attr('height', 20)
    .attr('x', 10)
    .attr('y', 40);

  legend.append('text')
    .attr('x', 115)
    .attr('y', 55)
    .text('King');

  legend.append('rect')
    .attr('class', 'line2')
    .attr('width',  75)
    .attr('height', 20)
    .attr('x', 10)
    .attr('y', 70);

  legend.append('text')
    .attr('x', 115)
    .attr('y', 80)
    .text('Washington');
}

function drawPaths (svg, data, x, y) {
  // var upperOuterArea = d3.svg.area()
  //   .interpolate('basis')
  //   .x (function (d) { return x(d.date) || 1; })
  //   .y0(function (d) { return y(d.pct95); })
  //   .y1(function (d) { return y(d.pct75); });

  // var upperInnerArea = d3.svg.area()
  //   .interpolate('basis')
  //   .x (function (d) { return x(d.date) || 1; })
  //   .y0(function (d) { return y(d.pct75); })
  //   .y1(function (d) { return y(d.pct50); });

  var medianLine = d3.svg.line()
    .interpolate('basis')
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.pct75); });

  var Line1 = d3.svg.line()
    .interpolate('basis')
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.pct05); });

  var Line2 = d3.svg.line()
    .interpolate('basis')
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.pct25); });


  // var lowerInnerArea = d3.svg.area()
  //   .interpolate('basis')
  //   .x (function (d) { return x(d.date) || 1; })
  //   .y0(function (d) { return y(d.pct50); })
  //   .y1(function (d) { return y(d.pct25); });

  // var lowerOuterArea = d3.svg.area()
  //   .interpolate('basis')
  //   .x (function (d) { return x(d.date) || 1; })
  //   .y0(function (d) { return y(d.pct25); })
  //   .y1(function (d) { return y(d.pct05); });

  svg.datum(data);

  // svg.append('path')
  //   .attr('class', 'area upper outer')
  //   .attr('d', upperOuterArea)
  //   .attr('clip-path', 'url(#rect-clip)');

  // svg.append('path')
  //   .attr('class', 'area lower outer')
  //   .attr('d', lowerOuterArea)
  //   .attr('clip-path', 'url(#rect-clip)');

  // svg.append('path')
  //   .attr('class', 'area upper inner')
  //   .attr('d', upperInnerArea)
  //   .attr('clip-path', 'url(#rect-clip)');

  // svg.append('path')
  //   .attr('class', 'area lower inner')
  //   .attr('d', lowerInnerArea)
  //   .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'median-line')
    .attr('d', medianLine)
    .attr('clip-path', 'url(#rect-clip)')
    .attr('stroke', 'green')
    .attr('fill', 'green')
    .attr("opacity", 0.5);
  svg.append('path')
    .attr('class', 'line1')
    .attr('d', Line1)
    .attr('clip-path', 'url(#rect-clip)')
    .attr('stroke', 'red')
    .attr('fill', 'red')
    .attr("opacity", 0.5);
  svg.append('path')
    .attr('class', 'line2')
    .attr('d', Line2)
    .attr('clip-path', 'url(#rect-clip)')
    .attr('stroke', 'blue')
    .attr('fill', 'blue')
    .attr("opacity", 0.5);
}


// function addMarker (marker, svg, chartHeight, x) {
//   var radius = 32,
//       xPos = x(marker.date) - radius - 3,
//       yPosStart = chartHeight - radius - 3,
//       yPosEnd = (marker.type === 'Client' ? 80 : 160) + radius - 3;

//   var markerG = svg.append('g')
//     .attr('class', 'marker '+marker.type.toLowerCase())
//     .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
//     .attr('opacity', 0);

//   markerG.transition()
//     .duration(1000)
//     .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
//     .attr('opacity', 1);

//   markerG.append('path')
//     .attr('d', 'M' + radius + ',' + (chartHeight-yPosStart) + 'L' + radius + ',' + (chartHeight-yPosStart))
//     .transition()
//       .duration(1000)
//       .attr('d', 'M' + radius + ',' + (chartHeight-yPosEnd) + 'L' + radius + ',' + (radius*2));

//   markerG.append('circle')
//     .attr('class', 'marker-bg')
//     .attr('cx', radius)
//     .attr('cy', radius)
//     .attr('r', radius);

//   markerG.append('text')
//     .attr('x', radius)
//     .attr('y', radius*0.9)
//     .text(marker.type);

//   markerG.append('text')
//     .attr('x', radius)
//     .attr('y', radius*1.5)
//     .text(marker.version);
// }

function startTransitions (svg, chartWidth, chartHeight, rectClip, markers, x) {
  rectClip.transition()
    .duration(1000*markers.length)
    .attr('width', chartWidth);

  // markers.forEach(function (marker, i) {
  //   setTimeout(function () {
  //     addMarker(marker, svg, chartHeight, x);
  //   }, 1000 + 500*i);
  // });
}

function makeChart (data, markers) {
  var svgWidth  = 1000,
      svgHeight = 550,
      margin = { top: 20, right: 50, bottom: 40, left: 180 },
      chartWidth  = svgWidth  - margin.left - margin.right,
      chartHeight = svgHeight - margin.top  - margin.bottom;

  var x = d3.time.scale().range([0, chartWidth])
            .domain(d3.extent(data, function (d) { return d.date; })),
      y = d3.scale.linear().range([chartHeight, 0])
            .domain([0, d3.max(data, function (d) { return d.pct75; })]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom')
                .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
      yAxis = d3.svg.axis().scale(y).orient('left')
                .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

  var svg = d3.select('#top_cities')
    .attr('width',  svgWidth)
    .attr('height', svgHeight)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // clipping to start chart hidden and slide it in later
  var rectClip = svg.append('clipPath')
    .attr('id', 'rect-clip')
    .append('rect')
      .attr('width', 0)
      .attr('height', chartHeight);

  addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
  drawPaths(svg, data, x, y);
  startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x);
}

var parseDate  = d3.time.format('%Y').parse;
d3.json('../data/top_cities.json', function (error, rawData) {
  if (error) {
    console.error(error);
    return;
  }

  var data = rawData.map(function (d) {
    return {
      date:  parseDate(d.year),
      pct05: d.King,
      pct25: d.Washington  ,
      pct50: d.LosAngeles ,
      pct75: d.Cook ,
      pct95: d.Oswego
    };
  });

  d3.json('../data/markers.json', function (error, markerData) {
    if (error) {
      console.error(error);
      return;
    }

    var markers = markerData.map(function (marker) {
      return {
        date: parseDate(marker.date),
        type: marker.type,
        version: marker.version
      };
    });

    makeChart(data, markers);
  });
});