
var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>";
            })

var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
    .range(["#00FF00", "#00FF7F", "#7FFF00", "#32CD32", "#228B22", "#2E8B57","#556B2F","#6B8E23","#008000","#006400"]);

var path = d3.geoPath();

// var svg = d3.select("body")
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             .append('g')
//             .attr('class', 'map');
var svg = d3.select("#world-sightings");
console.log(svg)
var projection = d3.geoMercator()
                   .scale(250)
                   .center([-98, 39])  // center on US
                   .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

d3.json("../data/world_countries.json", function(error, data) {
  if (error) throw error;
  d3.tsv("../data/world_population.tsv", function(error, population) {
    if (error) throw error;
    ready(error, data, population);
  });
});

function ready(error, data, population) {
  var populationById = {};

  population.forEach(function(d) { populationById[d.id] = +d.population; });
  data.features.forEach(function(d) { d.population = populationById[d.id] });

  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(populationById[d.id]); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

  // borders: data is geojson, not topojson; skip to avoid error. Countries will still show.
  // svg.append("path")
  //     .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
  //     .attr("class", "names")
  //     .attr("d", path);
}

// plot sample "sightings" as pink dots using high-pop locations as proxy (from US-focused data)
d3.json("../data/population.json", function(error, popdata) {
  if (error) return;
  var points = [];
  for (var i = 0; i < popdata.length; i += 30) {  // sample ~1/30 to keep light
    var d = popdata[i];
    if (d.latitude != null && d.longitude != null) {
      points.push([+d.longitude, +d.latitude]);
    }
  }
  plot(points);
});

function plot(data){
    
    svg.selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("cx", function (d) { //console.log("Data:"+d);console.log(projection(d)); 
      return projection(d)[0]; })
    .attr("cy", function (d) { return projection(d)[1]; })
    .attr("r", "1px")
    .attr("fill", "yellow"); /* brighter UFO color on dark map bg - Team12 subdir fix */

  }
  

// (removed remnant plot code that was causing issues / not part of main map viz)
