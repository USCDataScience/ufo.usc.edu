<?php
header('Content-Type: text/html; charset=utf-8');
header("Access-Control-Allow-Origin: *");
$query = isset($_REQUEST['q']) ? $_REQUEST['q'] : false;
?>
<html>
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
 <title>D3 Dynamic Visualization via Solr Index</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <style>

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  position: relative;
  width: 960px;
}

.axis text {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.bar {
  fill: steelblue;
  fill-opacity: .9;
}

.x.axis path {
  display: none;
}

label {
  position: absolute;
  top: 10px;
  right: 10px;
}

</style>
 </head>
 <body>
 <div style="width: auto; background-color: #f2f2f2;">
 <table style="text-align: left;">
 <form accept-charset="utf-8" method="get">
<tr>
 <th><img src="../images/logo.png" alt="Smiley face" height="80" width="250"></th>
 <td><input id="q" name="q" type="text" size = "50" value="<?php echo htmlspecialchars($query, ENT_QUOTES, 'utf-8'); ?>"/></td>
 <td><input type="submit" value="Submit"/></td>
 <td><label><input type="checkbox"> Sort!</label></td>
</tr>
<tr>

</tr>
 </form>
</table>
</div>

<script src="http://d3js.org/d3.v3.min.js"></script>
   <script>
   var term = $('#q').val();
   // console.log(term);
   $.ajax({
          url: "http://localhost:8983/solr/bigdata1/select?wt=json&q=description:"+term,
	  // +"&fl=jaccard_score,jaccard_score"
          dataType: "jsonp",
          jsonp: "json.wrf",
          success: function( data ) {
		var json=JSON.stringify(data);
	        json=JSON.parse(json)
		//console.log(json);
		

		var margin = {top: 20, right: 20, bottom: 30, left: 40},
    		width = 960 - margin.left - margin.right,
    		height = 600 - margin.top - margin.bottom;

		var formatPercent = d3.format(".0%");

		var x = d3.scale.ordinal()
    		.rangeRoundBands([0, width], .1, 1);

		var y = d3.scale.linear()
    		.range([height, 0]);

		var xAxis = d3.svg.axis()
    		.scale(x)
    		.orient("bottom");

		var yAxis = d3.svg.axis()
    		.scale(y)
    		.orient("left")
    		.tickFormat(formatPercent);

		var svg = d3.select("body").append("svg")
    		.attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		var _data;
	  	_data = json.response.docs;
	  	
		if(json.response.docs.length > 0){
	  	x.domain(_data.map(function(d) { return d.reported_at; }));
	  	y.domain([0, d3.max(_data, function(d) { return d.jaccard_score*10; })]);

	  	svg.append("g")
	      	.attr("class", "x axis")
	      	.attr("transform", "translate(0," + height + ")")
	      	.call(xAxis);

	  	svg.append("g")
	      	.attr("class", "y axis")
	      	.call(yAxis)
	    	.append("text")
	      	.attr("transform", "rotate(-90)")
	      	.attr("y", 6)
	      	.attr("dy", ".71em")
	      	.style("text-anchor", "end")
	      	.text("jaccard_score");

	 	 svg.selectAll(".bar")
	      	.data(_data)
	    	.enter().append("rect")
	      	.attr("class", "bar")
	      	.attr("x", function(d) { return x(d.reported_at); })
	      	.attr("width", x.rangeBand())
	      	.attr("y", function(d) { return y(d.jaccard_score); })
	      	.attr("height", function(d) { return height - y(d.jaccard_score); });

	  	d3.select("input").on("change", change);

	  	var sortTimeout = setTimeout(function() {
	    		d3.select("input").property("checked", true).each(change);
	  	}, 2000);

	  function change() {
	    clearTimeout(sortTimeout);

	    // Copy-on-write since tweens are evaluated after a delay.
	    var x0 = x.domain(_data.sort(this.checked
		? function(a, b) { return b.jaccard_score - a.jaccard_score; }
		: function(a, b) { return d3.ascending(a.reported_at, b.reported_at); })
		.map(function(d) { return d.reported_at; }))
		.copy();

	    svg.selectAll(".bar")
		.sort(function(a, b) { return x0(a.reported_at) - x0(b.reported_at); });

	    var transition = svg.transition().duration(750),
		delay = function(d, i) { return i * 50; };

	    transition.selectAll(".bar")
		.delay(delay)
		.attr("x", function(d) { return x0(d.reported_at); });

	    transition.select(".x.axis")
		.call(xAxis)
	      .selectAll("g")
		.delay(delay);
	  }
         }
	}
   });
   </script>
 </body> 
</html>
