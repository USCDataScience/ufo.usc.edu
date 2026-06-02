// set projection
try{
  var projection = d3.geo.mercator();
}
catch(err){
  var projection = d3.geoMercator();
}

// create path variable
try{
    var path = d3.geo.path()
    .projection(projection);
}
catch(err){
  var path = d3.geoPath()
    .projection(projection);

}

var date1,date2;
try{
d3.json("../data/us.json", function(error, topo) { //console.log(topo);

    states = topojson.feature(topo, topo.objects.states).features

    // set projection parameters
    projection
      .scale(1100)
      .center([-106, 37.5])

    // create svg variable
    // var svg = d3.select("body").append("svg")
    //         .attr("width", width)
    //         .attr("height", height);

  var svg = d3.select("#population-map");
  function plot(data){
    
    svg.selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("cx", function (d) { //console.log("Data:"+d);console.log(projection(d)); 
      return projection(d)[0]; })
    .attr("cy", function (d) { return projection(d)[1]; })
    .attr("r", "2px")
    .attr("fill", function(d){ 
      //console.log(d[2])
        if(d[2]<10000)
          {return "yellow";}
        else if(d[2]<20000)
          {return "orange";}
        else if(d[2]<40000)
          {return "red";}
        else
          {return "maroon";}


      });

  }
  
  // add states from topojson
  svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "steelblue")
      .attr("d", path);

    // put boarder around states 
    svg.append("path")
      .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);
    

    pop = d3.json("../data/population.json" , function(data){
      var count = Object.keys(data).length
      var pop = []

      for(i =0;i<count;i++)
      {
          var p = []
          if (data[i]["latitude"]!=null & data[i]["longitude"]!= null)
          {
            
            p.push(data[i]["longitude"],data[i]["latitude"],data[i]["population"])
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
    
});
}
catch(err){
  d3.json("data/us.json", function(error, topo) { //console.log(topo);

    states = topojson.feature(topo, topo.objects.states).features

    // set projection parameters
    projection
      .scale(1100)
      .center([-106, 37.5])

    // create svg variable
    // var svg = d3.select("body").append("svg")
    //         .attr("width", width)
    //         .attr("height", height);

  var svg = d3.select("#population-map");
  function plot(data){
    
    svg.selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("cx", function (d) { //console.log("Data:"+d);console.log(projection(d)); 
      return projection(d)[0]; })
    .attr("cy", function (d) { return projection(d)[1]; })
    .attr("r", "2px")
    .attr("fill", function(d){ 
      //console.log(d[2])
        if(d[2]<10000)
          {return "yellow";}
        else if(d[2]<20000)
          {return "orange";}
        else if(d[2]<40000)
          {return "red";}
        else
          {return "maroon";}


      });

  }
  
  // add states from topojson
  svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "steelblue")
      .attr("d", path);

    // put boarder around states 
    svg.append("path")
      .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);
    

    pop = d3.json("data/population.json" , function(data){
      var count = Object.keys(data).length
      var pop = []

      for(i =0;i<count;i++)
      {
          var p = []
          if (data[i]["latitude"]!=null & data[i]["longitude"]!= null)
          {
            
            p.push(data[i]["longitude"],data[i]["latitude"],data[i]["population"])
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
    
});
}
var maroon = d3.select("#maroon-circle")
maroon.append("circle")
    .attr("cx", "5px")
    .attr("cy", "5px")
    .attr("r", "2px")
    .attr("fill", "maroon")

var red = d3.select("#red-circle")
red.append("circle")
    .attr("cx", "5px")
    .attr("cy", "5px")
    .attr("r", "2px")
    .attr("fill", "red")
  
var orange = d3.select("#orange-circle")
orange.append("circle")
    .attr("cx", "5px")
    .attr("cy", "5px")
    .attr("r", "2px")
    .attr("fill", "orange")

var yellow = d3.select("#yellow-circle")
yellow.append("circle")
    .attr("cx", "5px")
    .attr("cy", "5px")
    .attr("r", "2px")
    .attr("fill", "yellow")
