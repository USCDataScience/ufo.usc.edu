var margin = {top: 5, right: 0, bottom: 0, left: 0};

var width = 700-margin.left-margin.right;
var height = 700-margin.top - margin.bottom;
var fullWidth = width + margin.left+margin.right;
var fullHeight = height+margin.top+margin.bottom;
var radius = (Math.min(width, height)-100) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20b);

var svg = d3.select("#chart").append("svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight);

var g = svg.append("g")
    .attr("transform","translate(" + (fullWidth / 2) + "," + (fullHeight / 2) +")")
    .attr("class","chartGroup");

var donutWidth = ( width / 4);

var arc = d3.arc()
    .innerRadius(donutWidth)
    .outerRadius(radius);

var pie = d3.pie()
    .value(function(d) { return d.count})
    .sort(null);

var tooltip = d3.select('#chart')
    .append('div')
    .attr('class','tooltip')

tooltip.append('div')
    .attr('class','label');
tooltip.append('div')
    .attr('class', 'count');
tooltip.append('div')
    .attr('class','percent');



 d3.csv('ufo-shape-count.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.count = +d.count;
            d.enabled = true;
          });

var path = g.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
        .attr('d',arc)
        .attr('fill', function(d,i){
            return color(d.data.label);
        })
    .each(function(d){this._current = d;});

path.on('mousemove', function(d){
      var xposSub = document.getElementById("chart").getBoundingClientRect().left;
      var xpos = d3.event.x - xposSub + 20
      var ypos = d3.event.y
      tooltip.style("left" ,xpos + "px")
      tooltip.style("top", ypos + "px")
    var total = d3.sum(dataset.map(function(d){
      return (d.enabled) ? d.count : 0;
    }));
  var percent = Math.round(10000 * d.data.count / total) / 100;
  tooltip.select('.label').html("Shape : " + d.data.label);
  tooltip.select('.count').html("Count : " + d.data.count);
  tooltip.select('.percent').html(percent + '%');
  tooltip.style('display', 'block');
});



path.on('mouseout', function(d){
    tooltip.style('display','none');

});

var legendRectSize = 18;
var legendSpacing = 10;

var legend = g.selectAll('.legend')
    .data(color.domain())
    .enter()
        .append('g')
        .attr('class','legend')
        .attr('transform', function(d,i){
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height-offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width',legendRectSize)
        .attr('height',legendRectSize)
        .style('fill',color)
        .style('stroke',color)

        .on('click', function(label){
        var rect = d3.select(this);
  var enabled = true;
  var totalEnabled = d3.sum(dataset.map(function(d) {
    return (d.enabled) ? 1 : 0;
  }));

  if (rect.attr('class') === 'disabled') {
    rect.attr('class', '');
  } else {
    if (totalEnabled < 2) return;
    rect.attr('class', 'disabled');
    enabled = false;
  }

  pie.value(function(d) {
    if (d.label === label) d.enabled = enabled;
    return (d.enabled) ? d.count : 0;
  });

  path = path.data(pie(dataset));

  path.transition()
    .duration(750)
    .attrTween('d', function(d) {
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    });
    });


legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .attr('style','font-size: 18')
  .attr('alignment-baseline','middle')
  .text(function(d) { return d; });

 });