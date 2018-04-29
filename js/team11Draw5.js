/*//////////////////////////////////////////////////////////////////////////*/
//Samsung side of Samsung-Nokia chord
/*//////////////////////////////////////////////////////////////////////////*/
function Draw5(){

	/*First disable click event on clicker button*/
	stopClicker();
	/*Show and run the progressBar*/
	runProgressBar(time=700*2);	
	
	/*Samsung and Nokia text*/
	changeTopText(newText = "Let us now look at correlation between various attributes.",
		loc = 5, delayDisappear = 0, delayAppear = 1, finalText = true);

	changeBottomText(newText = "",
		loc = -1/2, delayDisappear = 0, delayAppear = 1, finalText = true);
	
    /*Make the non Samsung & Nokia arcs less visible*/
    svg.selectAll("g.group").select("path")
		.transition().duration(1000)
		.style("opacity", opacityValue);		
	
};/*Draw5*/