/*//////////////////////////////////////////////////////////	
//Show Arc of Apple
//////////////////////////////////////////////////////////*/
function Draw2(){ 

	/*First disable click event on clicker button*/
	stopClicker();
	
	/*Show and run the progressBar*/
	runProgressBar(time=700*2);
				
	/*Initiate all arcs but only show the Apple arc (d.index = 0)*/
	g.append("svg:path")
	  .style("stroke", function(d) { return fill(d.index); })
	  .style("fill", function(d) { return fill(d.index); })
	  .transition().duration(700)
	  .attr("d", arc)
	  .attrTween("d", function(d) {
		if(d.index == 0) {
		   var i = d3.interpolate(d.startAngle, d.endAngle);
		   return function(t) {
			   d.endAngle = i(t);
			 return arc(d);
		   }
		}
	  });
	  
	/*Show the tick around the Apple arc*/
	// d3.selectAll("g.group").selectAll("line")
	// 	.transition().delay(700).duration(1000)
	// 	.style("stroke", function(d, i, j) {return j ? 0 : "#000"; });

	/*Add the labels for the %'s at Apple*/
	// d3.selectAll("g.group").selectAll(".tickLabels")
	// 	.transition().delay(700).duration(2000)
	// 	.attr("opacity", function(d, i, j) {return j ? 0 : 1; });

	/*Show the Apple name*/
	d3.selectAll(".titles")
	  .transition().duration(2000)
	  .attr("opacity", function(d, i) {return d.index ? 0 : 1; });
	  
	  //Light(10296),Circle(4844) and Triangle(5645) accounted for 60% of the sightings reported with shape. From ufo_awesome alone 10202 sightings reported the shape to be light
	/*Switch  text*/
	changeTopText(newText = "Sightings include 51285 from UFO-awesome, 656 form OCR, 9192 from UFO-Stalker",
	loc = 1/2, delayDisappear = 0, delayAppear = 1, finalText = true);
	
	changeBottomText(newText = "",
	loc = 0/2, delayDisappear = 0, delayAppear = 1)	;
	
};/*Draw2*/

