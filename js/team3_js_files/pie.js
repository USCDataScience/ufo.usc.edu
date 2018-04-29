$(function(){

  queue()
  .defer(d3.csv, '../../data_files/ufo_days_of_week.csv')
  .await(handleData);

  function handleData(error, data){
    var width = 960,
      height = 500;

    var radius = Math.min(width, height) / 2;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var pie = d3.pie()
      .sort(null)
      .value(function(d){ return d.count});

    var path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    var label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    var arc = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    arc.append("path")
      .attr("d", path)
      .attr("fill", function(d){return color(d.data.day_of_week)});

    arc.append("text")
      // .attr("transform", function(d){return "translate(" + label.centroid(d) + ")"})
      .attr("dy", "0.35em")
      .text(function(d){return d.data.day_of_week});


  }
})
