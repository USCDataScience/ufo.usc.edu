/*//////////////////////////////////////////////////////////	
//Introduction
///////////////////////////////////////////////////////////*/
function Draw1(){

	/*First disable click event on clicker button*/
	stopClicker();
		
	/*Show and run the progressBar*/
	runProgressBar(time=50*11);
		
	changeTopText(newText = "Summary of few interesting attributes and their correlation in our dataset",
	loc = 4/2, delayDisappear = 0, delayAppear = 1, finalText=true);

	// changeTopText(newText = "",
	// loc = 8/2, delayDisappear = 5, delayAppear = 5, finalText = true);
	
	changeBottomText(newText = "",
	loc = 1/2, delayDisappear = 0, delayAppear = 5);
	
	//Remove arcs again
	// d3.selectAll(".arc")
	// 	.transition().delay(9*700).duration(2100)
	// 	.style("opacity", 0)
	// 	.each("end", function() {d3.selectAll(".arc").remove();});
		d3.selectAll(".arc").remove();
		
};/*Draw1*/