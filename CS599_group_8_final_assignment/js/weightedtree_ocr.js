/*
 Copyright (c) 2016, BrightPoint Consulting, Inc.

 MIT LICENSE:

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
 */

// @version 1.1.54

//**************************************************************************************************************
//
//  This is a test/example file that shows you one way you could use a vizuly object.
//  We have tried to make these examples easy enough to follow, while still using some more advanced
//  techniques.  Vizuly does not rely on any libraries other than D3.  These examples do use jQuery and
//  materialize.css to simplify the examples and provide a decent UI framework.
//
//**************************************************************************************************************


// html element that holds the chart
var d3_visual_div;

// our weighted tree
var viz;

// our theme
var theme;

// nested data
var data = {};

// string to display with tips
var displayString = "Number of Sightings";

// stores the currently selected value field
var valueField = "Quantity";
var valueFields = ["Quantity"];


var formatQuantity = function (d) { if (isNaN(d)) d = 0; return d; };

function loadData() {

    var blob;

    d3.json("../json_data/ocr_tree_data.json", tsv => {

        data.values = prepJSONdata(tsv);

        blob = JSON.stringify(data);

        initialize();

    });

}

function prepJSONdata(tsv) {

    var values=[];

    //Clean federal budget data and remove all rows where all values are zero or no labels
    tsv.forEach(function (d,i) {
        var t = 0;
        for (var i = 0; i < valueFields.length; i++) {
            t += Number(d[valueFields[i]]);
        }
        if (t >= 0) {
            values.push(d);
        }
    })

    //Make our data into a nested tree.  If you already have a nested structure you don't need to do this.
    var nest = d3.nest()
        .key(function (d) {
            return d.Level1;
        })
        .key(function (d) {
            return d.Level2;
        })
        .entries(values);

    //This will be a viz.data function;
    vizuly.core.util.aggregateNest(nest, valueFields, function (a, b) {
        return Number(a) + Number(b);
    });

    //Remove empty child nodes left at end of aggregation and add unqiue ids
    function removeEmptyNodes(node,parentId,childId) {
        if (!node) return;
        node.id=parentId + "_" + childId;
        if (node.values) {
            for(var i = node.values.length - 1; i >= 0; i--) {
                node.id=parentId + "_" + i;
                if(!node.values[i].key && !node.values[i].Level3) {
                    node.values.splice(i, 1);
                }
                else {
                    removeEmptyNodes(node.values[i],node.id,i)
                }
            }
        }
    }

    var node={};
    node.values = nest;
    removeEmptyNodes(node,"0","0");

    var blob = JSON.stringify(nest);
    return nest;

}


function initialize() {

    viz = vizuly.viz.weighted_tree(document.getElementById("d3_visual_div"));

    //Here we create three vizuly themes for each radial progress component.
    //A theme manages the look and feel of the component output.  You can only have
    //one component active per theme, so we bind each theme to the corresponding component.
    theme = vizuly.theme.weighted_tree(viz).skin(vizuly.skin.WEIGHTED_TREE_AXIIS);

    //Like D3 and jQuery, vizuly uses a function chaining syntax to set component properties
    //Here we set some bases line properties for all three components.
    viz.data(data)                                                      // Expects hierarchical array of objects.
        .width(600)                                                     // Width of component
        .height(600)                                                    // Height of component
        .children(function (d) { return d.values })                     // Denotes the property that holds child object array
        .key(function (d) { return d.id })                              // Unique key
        .value(function (d) {
            return Number(d["agg_" + valueField]) })                    // The property of the datum that will be used for the branch and node size
        .fixedSpan(-1)                                                  // fixedSpan > 0 will use this pixel value for horizontal spread versus auto size based on viz width
        .branchPadding(.07)
        .label(function (d) {                                           // returns label for each node.
            return trimLabel(d.key || (d['Level' + d.depth]))})
        .on("measure",onMeasure)                                        // Make any measurement changes
        .on("mouseover",onMouseOver)                                    // mouseover callback - all viz components issue these events
        .on("mouseout",onMouseOut)                                      // mouseout callback - all viz components issue these events
        .on("click",onClick);                                           // mouseout callback - all viz components issue these events


    d3_visual_div.transition().duration(300).style('width', 800 + 'px').style('height', 600 + 'px');
    viz.width(1000).height(1000*.8).update();

    // Open up some of the tree branches.
    viz.toggleNode(data.values[2]);
    viz.toggleNode(data.values[2].values[0]);
    viz.toggleNode(data.values[3]);

}


function trimLabel(label) {
    return (String(label).length > 20) ? String(label).substr(0, 17) + "..." : label;
}


var datatip='<div class="tooltip" style="width: 250px; background-opacity:.5">' +
    '<div class="header1">HEADER1</div>' +
    '<div class="header-rule"></div>' +
    '<div class="header2"> HEADER2 </div>' +
    '<div class="header-rule"></div>' +
    '<div class="header3"> HEADER3 </div>' +
    '</div>';


// This function uses the above html template to replace values and then creates a new <div> that it appends to the
// document.body.  This is just one way you could implement a data tip.
function createDataTip(x,y,h1,h2,h3) {

    var html = datatip.replace("HEADER1", h1);
    html = html.replace("HEADER2", h2);
    html = html.replace("HEADER3", h3);


    d3.select("body")
        .append("div")
        .attr("class", "vz-weighted_tree-tip")
        .style("position", "absolute")
        .style("top", y + "px")
        .style("left", (x - 125) + "px")
        .style("opacity",0)
        .html(html)
        .transition().style("opacity",1);

}

function onMeasure() {
    // Allows you to manually override vertical spacing
    // viz.tree().nodeSize([100,0]);
}

function onMouseOver(e,d,i) {
    if (d == data) return;
    var rect = e.getBoundingClientRect();
    if (d.target) d = d.target; //This if for link elements
    createDataTip(rect.left, (rect.top+viz.height() *.05), (d.key || (d['Level' + d.depth])), formatQuantity(d["agg_" + valueField]), displayString);


}

function onMouseOut(e,d,i) {
    d3.selectAll(".vz-weighted_tree-tip").remove();
}


//We can capture click events and respond to them
function onClick(g,d,i) {
    viz.toggleNode(d);
}


//This sets the same value for each radial progress
function changeData(val) {
    valueField=valueFields[Number(val)];
    viz.update();
}
