try{
  var projection = d3.geo.mercator();
}
catch(err){
  var projection = d3.geoMercator();
}

var svg = d3.select("#airports"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// var unemployment = d3.map();
var airport1 = d3.map();
var airport2 = d3.map();

try{
  var path = d3.geo.path();
}
catch(err){
  var path = d3.geoPath();
}


var x = d3.scaleLinear()
    .domain([1, 10])
    .rangeRound([600, 860]);

var color = d3.scaleThreshold()
    .domain(d3.range(2, 10))
    .range(d3.schemeBlues[9]);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,40)");

g.selectAll("rect")
  .data(color.range().map(function(d) {
      // console.log(d)
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      // console.log(d)
      return d;
    }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });

g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#fff")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("% of UFOs sighted near airports [0-10]");

g.call(d3.axisBottom(x)
    .tickSize(13)
    .tickFormat(function(x, i) { return i ? x : x + "%"; })
    .tickValues(color.domain()))
  .select(".domain")
    .remove();

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    .defer(d3.tsv, "../data/airport1.tsv", function(d) { 
      airport1.set(d.id, +d.rate); 
      
      })
    .await(ready)
d3.queue().await(populate);

function populate()
{
        pop = d3.json("../data/airport3.json" , function(data){
      var count = Object.keys(data).length
      var pop = []

      for(i =0;i<count;i++)
      {
          var p = []
          if (data[i]["lat"]!=null & data[i]["lon"]!= null)
          {
            
            p.push(+data[i]["lon"],+data[i]["lat"],+data[i]["count"])
            //console.log(p)
            pop.push(p)
            //plot([p])

          }
      }
      date1 = new Date();
      plot(pop)
      date2 = new Date();
      var diff = date2 - date1;
      console.log("time lag: "+diff+" ms");
      });

}


function plot(data){
    
    svg.selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("cx", function (d) { //console.log("Data:"+d);console.log(projection(d)); 
      return projection(d)[0]; })
    .attr("cy", function (d) { return projection(d)[1]; })
    .attr("r", "1.5px")
    .attr("fill", function(d){ 
      //console.log(d[2])
        if(d[2]<2)
          {return "yellow";}
        else if(d[2]<20)
          {return "orange";}
        else
          {return "red";}


      });

  }

function ready(error, us) {
  if (error) throw error;

  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("fill", function(d) { return color(d.count = airport1.get(d.id)); })
      .attr("d", path)
    .append("title")
      .text(function(d) { return d.count + "%"; });

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
}