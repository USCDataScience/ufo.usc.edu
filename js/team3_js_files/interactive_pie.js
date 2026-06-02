$(function(){
	queue()
	.defer(d3.csv, "../../data_files/ufo_days_of_week.csv")
	.await(handleData);

	function handleData(error, data){

		var margin = {top: 100,right: 200,bottom: 100,left: 100 },
	      		 width = 800,
	      		 height = 800;
	        	 var radius = Math.min(width, height) / 4;
	             var donutWidth = 75;
	             var color = d3.scaleOrdinal(d3.schemeCategory20);
	             var count = 0;
	             var svg = d3.select("body").append("svg")
	                         .attr('width', width)
	                         .attr('height', height)
	                         .append('g')
	                         .attr('transform', 'translate(' + (width / 2.5) +
	                         ',' + (height / 3.5) + ')');


				  var arc = d3.arc()
				              .innerRadius(0)
				              .outerRadius(150);
				  var arcOver = d3.arc()
				             	  .innerRadius(0)
				                .outerRadius(200 + 10);




				   var pie = d3.pie()
				             .sort(null)
				             .value(function (d) {

				             return d.count;
				             });
				  	var g = svg.selectAll(".arc")
				                   .data(pie(data))
				                   .enter().append("g")
				                   .attr('class',"arc")
				                   .on("mouseover", function() {
			        	                d3.select(this).select("path").transition().attr("d",arcOver).duration(200);
                                tooltip.style("display", null);

			        	                })
			        	           .on("mousemove", function(d) {
                              tooltip.transition().duration(200)
                             .style("opacity", 0.9);
                              tooltip.select("div").html( d.data.day_of_week  +" <br><strong>"  + d.data.count + "</strong>")
                             .style("position", "fixed")
                             .style("text-align", "center")
                               .style("width", "120px")
                             .style("height", "45px")
                             .style("padding", "2px")
                             .style("font", "12px sans-serif")
                             .style("background", "lightsteelblue")
                             .style("border", "0px")
                             .style("border-radius", "8px")
                             .style("left", (d3.event.pageX + 15) + "px")
                             .style("top", (d3.event.pageY - 28) + "px");
						        	    })
			        	           .on("mouseout", function() {
			        	                 tooltip.style("display", "none")
			        	                 d3.select(this).select("path").transition()
                                   .attr("d",arc)
                                   .duration(500);
			        	                })

			        	 var tooltip = d3.select("body").append("div")
			        	   .attr("class", "tooltip")
			        	   .style("opacity", 0.5);

			        	 tooltip.append("rect")
			        	   .attr("width", 30)
			        	   .attr("height", 20)
			        	   .attr("fill", "#ffffff")
			        	   .style("opacity", 0.5);

			        	 tooltip.append("div")
			        	   .attr("x", 15)
			        	   .attr("dy", "1.2em")
			        	   .style("text-anchor", "middle")
			        	   .attr("font-size", "1.5em")
			        	   .attr("font-weight", "bold");



				     g.append("path")
				         .attr("d", arc)
				         .style("fill", function (d) {
				             return color(d.data.day_of_week);
				          });

				     count = 0;
				    //Legend for charts
				     var legend = svg.selectAll(".legend")
				         .data(data).enter()
				         .append("g").attr("class", "legend")
				         .attr("legend-id", function(d) {
				             return count++;
				         })
				         .attr("transform", function(d, i) {
				             return "translate(-30," + (-90 + i * 20) + ")";
				         });


				     legend.append("rect")
				         .attr("x", width / 1.9)
				        .attr("word-wrap","break-word")
				         .attr("width", 18).attr("height", 18)
				         .style("fill", function(d) {
				             return color(d.day_of_week);
				         });
				     legend.append("text").attr("x", width / 2)
				         .attr("y", 9).attr("dy", ".35em")

				         .style("text-anchor", "end").text(function(d) {
				             return d.day_of_week;
				         });

	}});
