// var client = new $.es.Client({
//   hosts: 'localhost:9200'
// });


function loadUKMap(ufoCoords){
  var width = 960,
    height = 960;

// Spinner implementation from : http://bl.ocks.org/eesur/cf81a5ea738f85732707
  var opts = {
   lines: 9, // The number of lines to draw
   length: 9, // The length of each line
   width: 5, // The line thickness
   radius: 14, // The radius of the inner circle
   color: '#EE3124', // #rgb or #rrggbb or array of colors
   speed: 1.9, // Rounds per second
   trail: 40, // Afterglow percentage
   className: 'spinner', // The CSS class to assign to the spinner
 };

  var target = document.getElementById('mapArea');
  var spinner = new Spinner(opts).spin(target)

  var projection = d3.geo.albers()
      .center([0, 53.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(4000)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection)
      .pointRadius(2);

  var svg = d3.select("#mapArea").append("svg")
      .attr("width", width)
      .attr("height", height);

  d3.selectAll("#usa_checkbox").style("visibility", "hidden");
  d3.selectAll("#uk_checkbox").style("visibility", "hidden");

    queue()
    .defer(d3.csv, '../../data_files/UK_sports_coords.csv')
    .defer(d3.json, '../../data_files/uk.json')
    .defer(d3.csv,'../../data_files/uk_airport_dataset.csv')
    .defer(d3.csv, '../../data_files/UK_ufo_coords.csv')
    .await(makeMyUKMap);

  function makeMyUKMap(error,sports,uk,airports,ukufo) {


    var subunits = topojson.object(uk, uk.objects.subunits)

    svg.selectAll(".subunit")
        .data(subunits.geometries)
      .enter().append("path")
        .attr("class", function(d) { return "subunit " + d.id; })
        .attr("d", path);

    svg.append("path")
        .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary");

    svg.append("path")
        .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary IRL");

    svg.selectAll(".subunit-label")
        .data(subunits.geometries)
      .enter().append("text")
        .attr("class", function(d) { return "subunit-label " + d.id; })
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.name; });

       svg.selectAll("rect")
            .data(ukufo)
            .enter()
            .append("rect")
             .attr("x", function(d) {
                proj = projection([parseFloat(d.lon), parseFloat(d.lat)]);
                if (proj == null)
                    return
                return proj[0];
            })
            .attr("y", function(d) {
                proj = projection([parseFloat(d.lon), parseFloat(d.lat)]);
                if (proj == null)
                    return
                return proj[1];
            })
            //.attr("r", function(d) {return 2;})
            .attr("width","4px")
            .attr("height", "4px")
            .style("fill", "red")
            .style("opacity", 1);


         svg.selectAll("circle")
          .data(sports)
          .enter()
          .append("circle")
          .attr("class","sports")
          .attr("cx", function(d) {
              return projection([parseFloat(d.lon), parseFloat(d.lat)])[0];
          })
          .attr("cy", function(d) {
              return projection([parseFloat(d.lon), parseFloat(d.lat)])[1];
          })
          .attr("r", function(d) {
              return 8;
//                return Math.sqrt(d.population) / 150;
          })
          .style("fill", function(d) {

            return "green";

          })
          .style("opacity", 0.0)


          svg.selectAll("circle")
            .data(airports)
            .enter()
            .append("circle")
            .attr("class", "airports")
            .attr("cx", function(d) {
              proj = projection([parseFloat(d.longitude_deg), parseFloat(d.latitude_deg)]);
              if (proj == null)
                  return
              return proj[0];
            })
            .attr("cy", function(d) {
              proj = projection([parseFloat(d.longitude_deg), parseFloat(d.latitude_deg)]);
              if (proj == null)
                  return
              return proj[1];
            })
            .attr("r", function(d) {
              if (d.type === "small_airport")
                  return 0.7
              else if (d.type === "medium_airport")
                  return 1.7
              else
                  return 5.0

            })
            .style("fill", "rgb(30,9,207)")
            .style("opacity", 0.0);

            spinner.stop()

            d3.selectAll("#usa_checkbox").style("visibility", "hidden");
            d3.selectAll("#uk_checkbox").style("visibility", "visible");

             d3.selectAll(".ufoFilterUK").on("change", update_uk);

          function update_uk(){
            var choices = [];
            d3.selectAll(".ufoFilterUK").each(function(d){
              cb = d3.select(this);
              if(cb.property("checked")){
                choices.push(cb.property("value"));
              }
            });

            if(_.contains(choices, "metro")){
              svg.selectAll("circle.sports")
              .style("opacity", 0.5)
            }else{
              console.log("Inside else");
              svg.selectAll("circle.sports")
              .style("opacity", 0.0)
            }


            if(_.contains(choices, "airport")){
              svg.selectAll("circle.airports")
              .style("opacity", 0.7)
            }else{
              svg.selectAll("circle.airports")
              .style("opacity", 0.0)
            }
          }

  }

  // client.search({
  //   body: {
  //     query:{
  //       "exists" : { "field" : "lat" }
  //     },
  //     _source: ['lon', 'lat'],
  //     size: 4000
  //   }
  // }).then(function(body){
  //   var hits = body.hits.hits;
  //   console.log(hits);
  //   ufo_coords = [];

  //   _.forEach(hits, function(val){
  //     console.log();
  //     var resultObj = val['_source']
  //     ufo_coords.push([resultObj['lon'], resultObj['lat']]);
  //   });




 // })

}


function loadUSMap(){
  //Width and height of map
  var width = 960;
  var height = 500;

// Spinner implementation from : http://bl.ocks.org/eesur/cf81a5ea738f85732707
  var opts = {
   lines: 9, // The number of lines to draw
   length: 9, // The length of each line
   width: 5, // The line thickness
   radius: 14, // The radius of the inner circle
   color: '#EE3124', // #rgb or #rrggbb or array of colors
   speed: 1.9, // Rounds per second
   trail: 40, // Afterglow percentage
   className: 'spinner', // The CSS class to assign to the spinner
 };

  var target = document.getElementById('mapArea');
  var spinner = new Spinner(opts).spin(target)

  // D3 Projection
  var projection = d3.geo.albersUsa()
  				   .translate([width/2, height/2])    // translate to center of screen
  				   .scale([800]);          // scale things down so see entire US

  // Define path generator
  var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
  		  	 .projection(projection);  // tell path generator to use albersUsa projection

 var svg = d3.select('#mapArea').append('svg')
     .attr('width', width)
     .attr('height', height);

   d3.selectAll("#usa_checkbox").style("visibility", "hidden");
   d3.selectAll("#uk_checkbox").style("visibility", "hidden");


   queue()
   	.defer(d3.csv, '../../data_files/sports_franchises.csv')
   	.defer(d3.csv, '../../data_files/state-densities.csv')
    .defer(d3.json, '../../data_files/us-states.json')
    .defer(d3.csv, '../../data_files/meteorite-landings.csv')
    .defer(d3.csv, '../../data_files/airports.csv')
    .defer(d3.csv, '../../data_files/US_ufo_coords.csv')
   	.await(makeMyMap);

    function makeMyMap(error, sports, stateDensities, states, meteorites, airports,usufo){
      for (var j = 0; j < states.features.length; j++)  {
        states.features[j].properties.population = 0.0;
        states.features[j].properties.density_rank = -1.0
      }

      for (var i = 0; i < sports.length; i++) {
        // Grab State Name
        var data_state = sports[i].state;
        var state_pop = sports[i].population;
        for (var j = 0; j < states.features.length; j++)  {
          var jsonState = states.features[j].properties.name;
          if (data_state == jsonState) {
            states.features[j].properties.population += parseFloat(state_pop);
            break;
          }
        }
      }


      for (var i = 0; i < stateDensities.length; i++) {
        var density_data_state = stateDensities[i].state;
        var density_data_pop_rank = stateDensities[i].pop_rank;
        for (var j = 0; j < states.features.length; j++)  {
          var jsonState = states.features[j].properties.name;
          if (density_data_state == jsonState) {
              states.features[j].properties.density_rank = density_data_pop_rank;
          }
        }
      }


      svg.selectAll("path")
        .data(states.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#FF5733")
        .style("stroke-width", "1")
        .style("fill", "#FFFFFF")


        svg.selectAll("circle")
          .data(sports)
          .enter()
          .append("circle")
          .attr("class","sports")
          .attr("cx", function(d) {
              return projection([parseFloat(d.ua_lon), parseFloat(d.ua_lat)])[0];
          })
          .attr("cy", function(d) {
              return projection([parseFloat(d.ua_lon), parseFloat(d.ua_lat)])[1];
          })
          .attr("r", function(d) {
              return d.major_6_cnt * 5;
//                return Math.sqrt(d.population) / 150;
          })
          .style("fill", function(d) {
              value = d.major_6_cnt
              if (value) {
                  if (value == 1)
                      return "rgb(129,169,132)"
                  else if (value == 2)
                      return "rgb(129,169,132)"
                  else if (value == 3)
                      return "rgb(104,148,108)"
                  else if (value == 4)
                      return "rgb(76,116,80)"
                  else if (value == 5)
                      return "rgb(65,96,68)"
                  else if (value >= 6)
                      return "rgb(53,84,56)"
                  else
                      return "rgb(218,245,206)"

              }
          })
          .style("opacity", 0.0)

          svg.selectAll("circle")
            .data(airports)
            .enter()
            .append("circle")
            .attr("class", "airports")
            .attr("cx", function(d) {
              proj = projection([parseFloat(d.longitude_deg), parseFloat(d.latitude_deg)]);
              if (proj == null)
                  return
              return proj[0];
            })
            .attr("cy", function(d) {
              proj = projection([parseFloat(d.longitude_deg), parseFloat(d.latitude_deg)]);
              if (proj == null)
                  return
              return proj[1];
            })
            .attr("r", function(d) {
              if (d.type === "small_airport")
                  return 0.7
              else if (d.type === "medium_airport")
                  return 1.7
              else
                  return 5.0

            })
            .style("fill", "rgb(30,9,207)")
            .style("opacity", 0.0)

            // NOTE : PLotting meteorite data here
            svg.selectAll("circle")
            .data(meteorites)
            .enter()
            .append("circle")
            .attr("class", "meteorites")
            .attr("cx", function(d) {
                proj = projection([parseFloat(d.reclong), parseFloat(d.reclat)]);
                if (proj == null)
                    return
                return proj[0];
            })
            .attr("cy", function(d) {
                proj = projection([parseFloat(d.reclong), parseFloat(d.reclat)]);
                if (proj == null)
                    return
                return proj[1];
            })
            .attr("r", function(d) {
                return 1.5;
            })
            .style("fill", "rgb(0,0,0)")
            .style("opacity", 0.0)



          svg.selectAll("rect")
            .data(usufo)
            .enter()
            .append("rect")
             .attr("x", function(d) {
                proj = projection([parseFloat(d.geocoded_longitude), parseFloat(d.geocoded_latitude)]);
                if (proj == null)
                    return
                return proj[0];
            })
            .attr("y", function(d) {
                proj = projection([parseFloat(d.geocoded_longitude), parseFloat(d.geocoded_latitude)]);
                if (proj == null)
                    return
                return proj[1];
            })
            //.attr("r", function(d) {return 2;})
            .attr("width","2px")
            .attr("height", "2px")
            .style("fill", "rgb(102,255,102)")
            .style("opacity", 1);

            d3.selectAll("#usa_checkbox").style("visibility", "visible");
            d3.selectAll("#uk_checkbox").style("visibility", "hidden");
            spinner.stop();

          //TODO: Really long function, need to make it more generic
          // Handling checkbox values
          d3.selectAll(".ufoFilter").on("change", update);
          function update(){
            var choices = [];
            d3.selectAll(".ufoFilter").each(function(d){
              cb = d3.select(this);
              if(cb.property("checked")){
                choices.push(cb.property("value"));
              }
            });

            if(_.contains(choices, "population")){
              svg.selectAll("path")
              .attr("d", path)
              .style("stroke", "#fff")
              .style("stroke-width", "1")
              .style("fill", function(d) {
                  // Get data value
                  var value = d.properties.density_rank;
                  if (value) {
                      if (value == 1)
                          return "rgb(255,192,208)"
                      else if (value == 2)
                          return "rgb(255,128,160)"
                      else if (value == 3)
                          return "rgb(255,64,112)"
                      else if (value == 4)
                          return "rgb(255,0,64)"
                      else if (value == 5)
                          return "rgb(192,0,48)"
                      else
                          console.log("ERROR");
                          return "rgb(213,222,217)";
                  } else {
                      return "rgb(213,222,217)";
                  }
              });
            }else{
              svg.selectAll("path")
              .attr("d", path)
              .style("stroke", "#FF5733")
              .style("stroke-width", "1")
              .style("fill", "#FFFFFF")
            }

            if(_.contains(choices, "metro")){
              svg.selectAll("circle.sports")
              .style("opacity", 0.95)
            }else{
              console.log("Inside else");
              svg.selectAll("circle.sports")
              .style("opacity", 0.0)
            }


            if(_.contains(choices, "airport")){
              svg.selectAll("circle.airports")
              .style("opacity", 0.7)
            }else{
              svg.selectAll("circle.airports")
              .style("opacity", 0.0)
            }

            if(_.contains(choices, "meteorite")){
              svg.selectAll("circle.meteorites")
              .style("opacity", 0.8)
            }else{
              svg.selectAll("circle.meteorites")
              .style("opacity", 0.0)
            }

          }
    }
}

// This function is called when the document is loaded
$(function(){

  // lets get the ufo coordinates before we visualize the map
  // var ufoCoords = []
  // client.search({
  //   scroll: '10s',
  //   body: {
  //     query:{
  //       "exists" : { "field" : "geocoded_longitude" }
  //     },
  //     _source: ['geocoded_longitude', 'geocoded_latitude'],
  //     size: 9000
  //   }
  // },function handleData(err, body){
  //   var hits = body.hits.hits
  //   _.forEach(hits, function(val){
  //     var resultObj = val['_source']
  //     ufoCoords.push([resultObj['geocoded_longitude'], resultObj['geocoded_latitude']]);
  //   });

  //   if(body.hits.total !== ufoCoords.length){
  //     client.scroll({
  //       scrollId: body._scroll_id,
  //       scroll: '10s'
  //     }, handleData)
  //   }else{

      loadUSMap();
      //loadUKMap();
      console.log('all done');

      var selectOpt = window.parent.$("#countries")
      selectOpt.on('change', function(e){
        // Get the current selection and display the appropriate map
        var selection = selectOpt.val();
        switch (selection) {
          case 'us':
            d3.select("#mapArea").selectAll("svg").remove();
            loadUSMap();
            break;
          case 'uk':
            d3.select("#mapArea").selectAll("svg").remove();
            loadUKMap();
            break;
          default:

        }//switch
    })//onchange

  //}//else
//})//callback handleData

})
