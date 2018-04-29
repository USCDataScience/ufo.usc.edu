/*///////////////////////////////////////////////////////////  
//Draw the other arcs as well
//////////////////////////////////////////////////////////*/
function Draw3(){

	
	  
	  g.append("svg:path")
	  .style("stroke", function(d) { return fill(d.index); })
	  .style("fill", function(d) { return fill(d.index); })
	  .transition().duration(700)
	  .attr("d", arc)
	  .attrTween("d", function(d) {
		
	  });
	
	stopClicker();

	
	var arcDelay = [0,1,2,3,4,5,6,7,8,9];
	runProgressBar(time=50*(arcDelay[(arcDelay.length-1)]+1));	
		
		d3.index=0;
   /*Fill in the other arcs*/
   svg.selectAll("g.group").select("path")
	.transition().delay(function(d, i) { return 5400*arcDelay[i];}).duration(1800)
	.attrTween("d", function(d) {
		console.log(d.index);
		console.log(d);
		
		   var i = d3.interpolate(d.startAngle, d.endAngle);
		   return function(t) {
			   d.endAngle = i(t);
			 return arc(d);
		   }
		
    });
 
  
  svg.selectAll("g.group")
	.transition().delay(function(d,i) { return 5400*arcDelay[i]; }).duration(1800)
	.selectAll("text").style("opacity", 1);

	/*Change the text of the top section inside the circle accordingly*/
	/*HTC*/
	changeTopText(newText = "Out of 51285 UFO sightings in UFO-Awesome dataset 49272(96%) sightings have airports closer than 20 miles",
		loc = 10/2, delayDisappear = 0, delayAppear = 1);
	/*LG*/
	changeTopText(newText = "Light was the most reported shape(10296). This was followed by  Triangle(5645),circle(4844),disk(4042)",
		loc = 10/2, delayDisappear = 7, delayAppear = 8);
	/*Samsung*/
	changeTopText(newText = "From analysing description field alone we found few words to be repeating quite often.",
		loc = 10/2, delayDisappear = 15, delayAppear = 16);
	/*Sony*/
	changeTopText(newText = "There were more number of sightings reported in areas where alcohol consumption was high",
		loc = 10/2, delayDisappear = 22, delayAppear = 23, finalText = true);	

	changeTopText(newText = "There was no considerable difference in the number of sightings observed in Rural and Urban areas (considering entire dataset)",
		loc = 10/2, delayDisappear = 29, delayAppear = 30, finalText = true);	

	changeTopText(newText = "Analysing the image captions generated from image2txt we found few words to be repeated often",
		loc = 10/2, delayDisappear = 36, delayAppear = 37, finalText = true);		
	
	changeBottomText(newText = "Further most of these sightings(70%) are less than 3 miles from the airport",
		loc = -1/2, delayDisappear = 0, delayAppear = 1);
	/*Nokia*/
	changeBottomText(newText = "In all the 3 datasets light was highest occuring shape. In UFO stalker many people(20%) aslo reported star as the shape.",
		loc = -1/2, delayDisappear = 7, delayAppear = 8);	
	/*Other*/
	changeBottomText(newText = "December was most seen in OCR data, night was common in ufo_awesome, bright was oftsen seen in UFO stalkers",
		loc = -1/2, delayDisappear = 15, delayAppear = 16);	
	/*Chord intro*/
	changeBottomText(newText = "31,088 sightings of 52,000 odd ufo sightings were observerd to have alcohol consumption of atleast 30%",
		loc = -1/2, delayDisappear = 22, delayAppear = 23);	

	changeBottomText(newText = "Out of 51285 sightings, 23500 were spotted in rural areas 27785 in urban areas",
		loc = -1/2, delayDisappear = 29, delayAppear = 30);	

	changeBottomText(newText = "kite, plane, white, clock, scissors had high frequencies",
		loc = -1/2, delayDisappear = 36, delayAppear = 37, finalText = true);	

	

};/*Draw3*/