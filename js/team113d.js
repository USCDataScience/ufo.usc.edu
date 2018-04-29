Plotly.d3.json('../data/team113d.json', function(figure){
  	console.log(figure.data[0]);
  	
  var trace1 = {

	  x: figure.data[0].x, y: figure.data[0].y, z: figure.data[0].z,
	  name: '',
     colorscale: figure.data[0].colorscale,
     showscale: false
  }
  console.log(trace1)
  var trace2 = {
	  x: figure.data[1].x, y: figure.data[1].y, z: figure.data[1].z,
	  name: 'Sphere',
	  colorscale: figure.data[1].colorscale,
	  type: 'surface',
	  showscale: false 
  }
  var trace3 = {
	  x: figure.data[2].x, y: figure.data[2].y, z: figure.data[2].z,
	  name: 'Oval',
	  colorscale: figure.data[2].colorscale,
	  type: 'surface',
	  showscale: false
  }
  var trace4 = {
	  x: figure.data[3].x, y: figure.data[3].y, z: figure.data[3].z,
	  name: 'Triangle',
	  colorscale: figure.data[3].colorscale,
	  type: 'surface',
	  showscale: false
  }
  var trace5 = {
	  x: figure.data[4].x, y: figure.data[4].y, z: figure.data[4].z,
	  colorscale: figure.data[4].colorscale,
	  name: 'Disk',
	  type: 'surface',
	  showscale: false
  }
  var trace6 = {
	  x: figure.data[5].x, y: figure.data[5].y, z: figure.data[5].z,
	  colorscale: figure.data[5].colorscale,
	  name: 'Light',
	  type: 'surface',
	  showscale: false
  }
  var trace7 = {
	  x: figure.data[6].x, y: figure.data[6].y, z: figure.data[6].z,
	  name: 'Fireball',
	  colorscale: figure.data[6].colorscale,
	  type: 'surface',
	  showscale: false
  }
   var trace8 = {
	  x: figure.data[7].x, y: figure.data[7].y, z: figure.data[7].z,
	  name: 'Circle',
	  colorscale: figure.data[7].colorscale,
	  type: 'surface',
	  showscale: false
  }
  
  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7,trace8];

var layout = {
  title: 'Frequency distribution of different shapes for the period 2005-2010 (rotate the plot using mouse)',
  showlegend: false,
  scene: {
    xaxis: {title: 'Shape'},
    yaxis: {title: 'Year'},
    zaxis: {title: 'Count'}
  }
};
Plotly.newPlot('myDiv', data,layout);
});
