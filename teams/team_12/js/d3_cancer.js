function filterJSON(json, key, value) {
      //console.log(key, value)
      var result = [];
      json.forEach(function(val,idx,arr){
        //console.log(val[key])
        //console.log(idx)
        //console.log(arr)
        if(val[key] == value){
          result.push(val)
        }
      })
      return result;
}
flag = 1;
// Set the dimensions of the canvas / graph
var margin = {top: 20, right: 20, bottom: 20, left: 160},
    width = 900 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

// Parse the date / time


// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(30)
    .tickFormat(d3.time.format("%Y"))

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(20);

// Define the line
var stateline = d3.svg.line()
		.interpolate("cardinal")
    .x(function(d) { //console.log(Math.floor(x(d.year))); 
      return Math.floor(x(d.year)); })
    .y(function(d) { return y(d.value); });

// Adds the svg canvas
var svg = d3.select("#graph-svg")
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
var data;
// Get the data
d3.json("../data/cancer_counts.json", function(error, json) {
   //console.log(json)
 
  json.forEach(function(d) {
		d.value = +d.value;
  });

	d3.select('#inds')
			.on("change", function () {
				var sect = document.getElementById("inds");
				var section = sect.options[sect.selectedIndex].value;

				data = filterJSON(json, 'race', section);
        //console.log(data)
	      
	      //debugger
	      
		    data.forEach(function(d) {
    			d.value = +d.value;
    			//d.year = parseDate(String(d.year));
    			d.active = true;
    		});
    		
		    
		    //debugger
				updateGraph(data);


				jQuery('h1.page-header').html(section);
			});

	// generate initial graph
	data = filterJSON(json, 'race', 'hispanic');
	updateGraph(data);

});
var color_array = ["#458b74", "#0000ff", "#00008b", "#8a2be2", "#a52a2a", "#ff4040", "#7fff00", "#458b00", "#ff7f24", "#8b3e2f",
				"#00eeee", "#008b8b", "#b8860b", "#006400", "#ff1493", "#8b0a50", "#00bfff", "#1e90ff", "#104e8b", "#228b22",
				"#ffd700", "#525252", "#ffa07a", "#20b2aa", "#0000cd", "#ab82ff", "#191970", "#000080", "#8b8b00", "#ffa54f"]
var color = d3.scale.ordinal().range(color_array);

function updateGraph(data) {
    

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([d3.min(data, function(d) { return d.value; }), d3.max(data, function(d) { return d.value; })]);
    // console.log(d3.extent(data, function(d) { return d.year; }))
    console.log(2009+ " "+ x(2009)); 

    // Nest the entries by state
    dataNest = d3.nest()
        .key(function(d) {return d.state;})
        .entries(data);


 		var result = dataNest.filter(function(val,idx, arr){
				  return $("." + val.key).attr("fill") != "#ccc" 
				  // matching the data with selector status
				})
				
				
 		var state = svg.selectAll(".line")
      .data(result, function(d){
        if(flag ==1 )
         { console.log(d.key); flag = 0;}
        return d.key});

		state.enter().append("path")
			.attr("class", "line");

		state.transition()
			.style("stroke", function(d,i) { return d.color = color(d.key); })
			.attr("id", function(d){ return 'tag'+d.key.replace(/\s+/g, '');}) // assign ID
			.attr("d", function(d){
		
				return stateline(d.values)
			});

		state.exit().remove();

		var legend = d3.select("#legend")
			.selectAll("text")
			.data(dataNest, function(d){return d.key});

		//checkboxes
		legend.enter().append("rect")
		  .attr("width", 10)
		  .attr("height", 10)
		  .attr("x", 0)
		  .attr("y", function (d, i) { return 0 +i*15; })  // spacing
		  .attr("fill",function(d) { 
		    return color(d.key);
		    
		  })
		  .attr("class", function(d,i){return "legendcheckbox " + d.key})
			.on("click", function(d){
			  d.active = !d.active;
			  
			  d3.select(this).attr("fill", function(d){
			    if(d3.select(this).attr("fill")  == "#ccc"){
			      return color(d.key);
			    }else {
			      return "#ccc";
			    }
			  })
			  
			  
			 var result = dataNest.filter(function(val,idx, arr){
         return $("." + val.key).attr("fill") != "#ccc" 
       // matching the data with selector status
      })
      
       // Hide or show the lines based on the ID
       svg.selectAll(".line").data(result, function(d){return d.key})
         .enter()
         .append("path")
         .attr("class", "line")
         .style("stroke", function(d,i) { return d.color = color(d.key); })
        .attr("d", function(d){
                return stateline(d.values);
         });
 
      svg.selectAll(".line").data(result, function(d){return d.key}).exit().remove()  
					
			})
		        
    // Add the Legend text
    legend.enter().append("text")
      .attr("x", 15)
      .attr("y", function(d,i){return 10 +i*15;})
      .attr("class", "legend");

		legend.transition()
      .style("fill", "#777" )
      .text(function(d){return d.key;});

		legend.exit().remove();

		svg.selectAll(".axis").remove();

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year");
    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 50 - margin.left)
      .attr("x",50 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Cancer Incidence Counts");    
};

function clearAll(){
  d3.selectAll(".line")
	.transition().duration(100)
			.attr("d", function(d){
        return null;
      });
  d3.select("#legend").selectAll("rect")
  .transition().duration(100)
      .attr("fill", function(d) {
    if (d.active == true){
       return color(d.key);
     }
   })
};

function showAll(){
  d3.selectAll(".line")
	.transition().duration(100)
			.attr("d", function(d){
        return stateline(d.values);
      });
  d3.select("#legend").selectAll("rect")
  .attr("fill",function(d) {
    if (d.active == true){
       return color(d.key);
     }
   })
};