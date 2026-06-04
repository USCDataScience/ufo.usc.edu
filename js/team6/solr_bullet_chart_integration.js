// Static version - no Solr. Load CSV and aggregate counts per state per shape.
// Define all functions and vars first (to avoid ReferenceError on change binding and in async csv callback).
var margin = {top: 5, right: 40, bottom: 20, left: 120},
    width = 960 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

var chart = d3.bullet()
    .width(width)
    .height(height);

var fetched_all_data = function(shouldInitialize) {
	if(shouldInitialize) {
		var svg_d = [];
		for (shape in shapes) {
			svg_d.push(shapes[shape]);
		}
		initialize(svg_d);
	} else {
		var svg_d = svg.data();
		for (var i = 0; i < svg_d.length; i++) {
			svg_d[i] = shapes[svg_d[i].title.toLowerCase()];
		}
		svg.data(svg_d).call(chart.duration(1000));
	}
};

var shapes = {'light':{}, 'triangle':{}, 'fireball':{}, 'sphere':{}, 'disk':{}};
var len_shapes = 5;

var reload_bullet = function (initializeFlag) {
	var state = $("#sel1").val();
	var svg_d_ct = 0;
	for (var shape in shapes) {
		var count = (window.stateShapeCounts && window.stateShapeCounts[state] && window.stateShapeCounts[state][shape]) || 0;
		var title = shape;
		// fabricate bullet data (ranges/measures/markers for the 5 shapes)
		var d = {
			"title": title,
			"subtitle": state,
			"ranges": [0, Math.round(count * 0.5), count],
			"measures": [count],
			"markers": [Math.round(count * 0.8)]
		};
		svg_d_ct += 1;
		shapes[title] = d;
		if (svg_d_ct == len_shapes) {
			fetched_all_data(initializeFlag);
		}
	}
};

function initialize(data) {
	svg = d3.select("#bullet-chart").selectAll("svg")
		.data(data)
		.enter().append("svg")
		.attr("class", "bullet")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call(chart);

	var title = svg.append("g")
		.style("text-anchor", "end")
		.attr("transform", "translate(-6," + height / 2 + ")");

	title.append("text")
		.attr("class", "title")
		.text(function(d) { return d.title.charAt(0).toUpperCase() + d.title.slice(1); });
}

// Bind change after reload_bullet is defined.
$( "#sel1" ).change(function() {
	reload_bullet(false);
});

// Start async load last. Callback will populate select and call initial reload.
var csvPath = "../../data/team6/bullet_chart_state_shape_sightings.csv";

d3.csv(csvPath, function(error, rows) {
  if (error) {
    console.error("Failed to load static data for bullet chart:", error);
    d3.select("#bullet-chart").html("<em style='color:#c00'>Failed to load state/shape data.</em>");
    return;
  }
  // Build per-state per-shape counts (only the 5 shapes used by bullets)
  window.stateShapeCounts = {};
  rows.forEach(function(r) {
    var st = r.state;
    var shp = (r.shape || "").toLowerCase();
    if (!window.stateShapeCounts[st]) window.stateShapeCounts[st] = {};
    if (shapes.hasOwnProperty(shp)) {
      window.stateShapeCounts[st][shp] = (window.stateShapeCounts[st][shp] || 0) + 1;
    }
  });
  // populate dropdown cleanly
  var states_arr = Object.keys(window.stateShapeCounts).sort();
  var sel = $("#sel1");
  sel.empty();
  states_arr.forEach(function(s) {
    sel.append('<option value="' + s + '">' + s + '</option>');
  });
  if (states_arr.length > 0) {
    sel.val(states_arr[0]);
    reload_bullet(true);
  }
});