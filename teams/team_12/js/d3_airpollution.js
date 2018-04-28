before();
d3.select('#year')
			.on("change", function () {
				var sect = document.getElementById("year");
				var section = sect.options[sect.selectedIndex].value;
				console.log(section);
				if(section=="before")
				{
					before();
				}
				else if(section=="after")
				{
					after();
				}
				//jQuery('h1.page-header').html(section);
			});

function before()
{
	d3.json("../data/airpoll_1900s.json", function(error, data) {
				var co_data = data["co"]
				var so2_data = data["so2"]
				var o3_data = data["o3"]

			//console.log(data)
			TESTER = document.getElementById('tester');
			//Plotly.plot(TESTER, [co_data]);
			var trace1 = {
				  type: "scatter",
				  mode: "lines",
				  name: 'CO Mean',
				  x: co_data["x"],
				  y: co_data["y"],
				  line: {color: '#17BECF'}
				}

			var trace2 = {
				  type: "scatter",
				  mode: "lines",
				  name: 'SO2 Mean',
				  x: so2_data["x"],
				  y: so2_data["y"],
				  line: {color: '#7F7F7F'}
				}

			var trace3 = {
				  type: "scatter",
				  mode: "lines",
				  name: 'O3 Mean',
				  x: o3_data["x"],
				  y: o3_data["y"],
				  line: {color: '#0000ff'}
				}

			var data = [trace1,trace2, trace3];

			// var layout = {
			// 	  title: 'Air Pollution Time Series',
			// 	};

			var layout = {
				  title: 'Air Pollution Time Series',
				  xaxis: {
				    autorange: true,
				    rangeselector: {buttons: [
				        {
				          count: 6,
				          label: '6m',
				          step: 'month',
				          stepmode: 'backward'
				        },
				        {
				          count: 1,
				          label: '1y',
				          step: 'year',
				          stepmode: 'backward'
				        },
				        {step: 'all'}
				      ]},
				    rangeslider: {range: ['1901-12-02', '1999-12-31']},
				    type: 'date'
				  },
				  yaxis: {
				    autorange: true,
				    type: 'linear'
				  }
				};

			Plotly.newPlot(TESTER, data, layout);
});	
}


function after()
{
	d3.json("../data/airpoll_2000s.json", function(error, data) {
				var co_data = data["co"]
				var so2_data = data["so2"]
				var o3_data = data["o3"]
			//console.log(data);

			TESTER = document.getElementById('tester');
			//Plotly.plot(TESTER, [co_data]);
			var trace1 = {
				  type: "scatter",
				  mode: "lines",
				  name: 'CO Mean',
				  x: co_data["x"],
				  y: co_data["y"],
				  line: {color: '#17BECF'}
				}

			var trace2 = {
				  type: "scatter",
				  mode: "lines",
				  name: 'SO2 Mean',
				  x: so2_data["x"],
				  y: so2_data["y"],
				  line: {color: '#7F7F7F'}
				}

			var trace3 = {
				  type: "scatter",
				  mode: "lines",
				  name: 'O3 Mean',
				  x: o3_data["x"],
				  y: o3_data["y"],
				  line: {color: '#0000ff'}
				}

			var data = [trace1,trace2, trace3];

			var layout = {
				  title: 'Air Pollution Time Series',
				  xaxis: {
				    autorange: true,
				    rangeselector: {buttons: [
				        {
				          count: 6,
				          label: '6m',
				          step: 'month',
				          stepmode: 'backward'
				        },
				        {
				          count: 1,
				          label: '1y',
				          step: 'year',
				          stepmode: 'backward'
				        },
				        {step: 'all'}
				      ]},
				    rangeslider: {range: ['2000-01-01', '2010-08-30']},
				    type: 'date'
				  },
				  yaxis: {
				    autorange: true,
				    type: 'linear'
				  }
				};

			Plotly.newPlot(TESTER, data, layout);
});	
}
