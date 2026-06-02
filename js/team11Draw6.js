/*//////////////////////////////////////////////////////////////////////////*/
//Samsung from Nokia
/*//////////////////////////////////////////////////////////////////////////*/
function Draw6(){

	/*First disable click event on clicker button*/
	stopClicker();
	/*Show and run the progressBar*/
	runProgressBar(time=700*2);	
	
	/*Samsung and Nokia text*/
	changeTopText(newText = "There was a strong corelation between shape of the object observed and alcohol consumption in that area. Words like red,bright,north were observed to be used most frequently in rural areas and words like white,seconds,night were used most often in urban areas.",
		loc = 5, delayDisappear = 0, delayAppear = 1, finalText = true);


	chords.transition().duration(2000)
		.attr("opacity", function(d, i) { 
			console.log(d);
			if(d.source.index == 1 && d.target.index == 3) 
				{ console.log("inside"); return opacityValueBase;}
			if(d.source.index == 4 && d.target.index == 2)
				return opacityValueBase;
			
			else {return 0;}
		});
			
		
};/*Draw6*/