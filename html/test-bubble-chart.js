$(document).ready(function () {
  var bubbleChart = new d3.svg.BubbleChart({
    supportResponsive: true,
    //container: => use @default
    size: 600,
    //viewBoxSize: => use @default
    innerRadius: 600 / 3.5,
    //outerRadius: => use @default
    radiusMin: 40,
    //radiusMax: use @default
    //intersectDelta: use @default
    //intersectInc: use @default
    //circleColor: use @default
    data: {
      items: [
		{text: "2000", count: "16", event_ufo: "551", total_ufo: "3292"},
		{text: "2001", count: "18", event_ufo: "715", total_ufo: "3949"},
		{text: "2002", count: "17", event_ufo: "719", total_ufo: "4208"},
		{text: "2003", count: "17", event_ufo: "992", total_ufo: "5583"},
		{text: "2004", count: "17", event_ufo: "1008", total_ufo: "5701"},
		{text: "2005", count: "18", event_ufo: "1098", total_ufo: "5890"},
		{text: "2006", count: "19", event_ufo: "948", total_ufo: "4974"},
		{text: "2007", count: "19", event_ufo: "1091", total_ufo: "5634"},
		{text: "2008", count: "21", event_ufo: "1328", total_ufo: "6228"},
		{text: "2009", count: "19", event_ufo: "1132", total_ufo: "5662"},
		{text: "2010", count: "21", event_ufo: "696", total_ufo: "3304"},
      ],
      eval: function (item) {return item.count;},
      classed: function (item) {return item.text.split(" ").join("");}
    },
    plugins: [
      {
        name: "central-click",
        options: {
          text: "(See details)",
          style: {
            "font-size": "12px",
            "font-style": "italic",
            "font-family": "Source Sans Pro, sans-serif",
            //"font-weight": "700",
            "text-anchor": "middle",
            "fill": "white"
          },
          attr: {dy: "65px"},
          centralClick: function(item) {
            alert("Count of sightings during weather events: " + item.event_ufo + "\nTotal number of sightings: "+ item.total_ufo);
          }
        }
      },
      {
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "count",
              classed: {count: true},
              style: {
                "font-size": "28px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #1
              textField: "text",
              classed: {text: true},
              style: {
                "font-size": "14px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            }
          ],
          centralFormat: [
            {// Line #0
              style: {"font-size": "50px"},
              attr: {}
            },
            {// Line #1
              style: {"font-size": "30px"},
              attr: {dy: "40px"}
            }
          ]
        }
      }]
  });
});
