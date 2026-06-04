

var div = d3.select("body").append("div").attr("class", "toolTip");

d3.json("../data/shapes.json", function(error, data){
    var dataset = [];
    for (var shape in data) {
        if (data.hasOwnProperty(shape)) {
            dataset.push({name: shape, total: +data[shape]});
        }
    }

var color_array = ["#458b74", "#0000ff", "#00008b", "#8a2be2", "#a52a2a", "#ff4040", "#7fff00", "#458b00", "#ff7f24", "#8b3e2f",
                "#00eeee", "#008b8b", "#b8860b", "#006400", "#ff1493", "#8b0a50", "#00bfff", "#1e90ff", "#104e8b", "#228b22",
                "#ffd700", "#525252", "#ffa07a", "#20b2aa", "#0000cd", "#ab82ff", "#191970", "#000080", "#8b8b00", "#ffa54f"];

var width = 900,
    height = 600,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(color_array);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
     .startAngle(1.1*Math.PI)
    .endAngle(3.1*Math.PI)
    .value(function(d) { return d.total; });

var svg = d3.select("#pie-viz").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#111");

var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 var arcs = g.selectAll(".arc")
      .data(pie(dataset))
    .enter().append("g")
      .attr("class", "arc");

  arcs.append("path")
    .style("fill", function(d) { return color(d.data.name); })
    .transition().delay(function(d,i) {
    return i * 500; }).duration(500)
    .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        return function(t) {
            d.endAngle = i(t); 
            return arc(d)
            }
        }); 
  arcs.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("fill", "white")
      .transition()
      .delay(1000)
      .text(function(d) { return d.data.name; });

    d3.selectAll("#pie-viz path").on("mousemove", function(d) {
        div.style("left", d3.event.pageX+10+"px");
          div.style("top", d3.event.pageY-25+"px");
          div.style("display", "inline-block");
    div.html((d.data.name)+"<br>"+(d.data.total));
});
      
d3.selectAll("#pie-viz path").on("mouseout", function(d){
    div.style("display", "none");
});
      


});


//d3.select("body").transition().style("background-color", "#d3d3d3");
function type(d) {
  d.total = +d.total;
  return d;
}
