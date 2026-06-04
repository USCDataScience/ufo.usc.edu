$(function(){


queue()
.defer(d3.json, '../../data_files/statistics.json')
.await(handleData)

 function handleData(error, stateCount){
   // var stateCount = body.aggregations.types_count.buckets;



   var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

var formatPercent = d3.format(" ");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>"+d.key+" : </strong> <span style='color:red'>" + d.doc_count + "</span>";
  })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

  function abbrState(input, to){

  var states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arizona', 'AZ'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['District of Columbia','DC'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
  ];

  if (to == 'abbr'){
      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      for(i = 0; i < states.length; i++){
          if(states[i][0] == input){
              return(states[i][1]);
          }
      }
  }
}


  x.domain(stateCount.map(function(d) {
    state_ori_name = d.key
    state_abbr = abbrState(state_ori_name, 'abbr');
    d['abbr'] = state_abbr
    return d.abbr; }));
  y.domain([0, d3.max(stateCount, function(d) { return d.doc_count; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
        .attr("y", 9)
        .attr("transform",  "translate(" + 500+","+ 10 + ")")
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .style("font-weight","bold")
        .text("------------------------- STATES OF USA ----------------------------------------->");


  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight","bold")
      .text("Number of UFO Sightings");

  svg.selectAll(".bar")
      .data(stateCount)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.abbr); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.doc_count); })
      .attr("height", function(d) { return height - y(d.doc_count); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

};

function type(d) {
  d.doc_count = +d.doc_count;
  return d;
}
})
