
function doTreemapExample()
{
  //d3.json("http://www.verisi.com/resources/data/unemploy-states-json.txt", function(json) {   

  var json = getJsonData();
  alert("Hello, " + json.children);

  display(json);
}

function display(data) {
    // also see: http://bl.ocks.org/972398  for anchoring text
   var w = 960,
      h = 500,
      color = d3.interpolateRgb("rgb(0,255,0)", "rgb(255,0,0)");
      //xcolor = d3.scale.linear().domain([-26,13]).range("rgb(0,255,0)", "rgb(255,0,0)"),
      x = d3.scale.linear().domain([-26,13]).range([0, 1]),
      stepsize = [2.46, 1.66],
      minval = [-16.28, -16.67];
      
   var treemap = d3.layout.treemap()
      .size([w, h])
      .sticky(true)
      .value(function(d) { return d.size; });

   var div = d3.select("#treemap-transition").append("div")
      .style("position", "relative")
      .style("width", w + "px")
      .style("height", h + "px");

  alert("222");
	
	
  // note: XXX - this next piece of code makes the page disappear.
  div.data([json]).selectAll("div")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return treemap_color(d.roc3, 2.5, 10); }) 
      .call(cell)
      .attr("text-anchor", "middle")
      .text(function(d) { return d.children ? null : d.name; });

	alert("333"); 

  d3.select("#evotes").on("click", function() {
    div.selectAll("div")
        .data(treemap.value(function(d) { return d.size; }))
        .style("background", function(d) { return treemap_color(d.roc3, 2.5, 10); } ) 
      .transition()
        .duration(1500)
        .call(cell);

	alert("444"); 

    d3.select("#evotes").classed("active", true);
    d3.select("#pop").classed("active", false);
  });
 
  d3.select("#pop").on("click", function() {
    div.selectAll("div")
        .data(treemap.value(function(d) { return d.pop100k; }))
        .style("background", function(d) { return d.colorgrp; }) 
      .transition()
        .duration(1500)
        .call(cell);
 
    d3.select("#evotes").classed("active", false);
    d3.select("#pop").classed("active", true);
  });
 

  function cell() {
    this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; })
      .style("text-anchor", "middle");
  }

  function treemap_color(value, stepsize, steps) {
     if (value == 0) {

        return "rgb(0,0,0)";

     } else if (value < 0 ) {

        var x = Math.round( (255/steps) * Math.abs( value/stepsize) );
        return 'rgb(0,' + x + ',0)';   //DECREASE in unemployment => green

     } else {

        var y = Math.round(  (255/steps) * value/stepsize );
        return 'rgb(' + y + ',0,0)';  //INCREASE in unemployment => red
     }
  }
}

function getJsonData()
{
	return {
	 "name": "tree-votes",
	 "children": [
	    {
	     "name": "blue",
	     "children": [
		{"name":"CA", "colorgrp":"blue" , "roc2":5.17 , "roc3":-0.82, "pop100k":357.95, "size":55},
		{"name":"CT", "colorgrp":"blue" , "roc2":7.06 , "roc3":0, "pop100k":34.77, "size":7},
		{"name":"DE", "colorgrp":"blue" , "roc2":1.19 , "roc3":-1.18, "pop100k":8.4, "size":3},
		{"name":"HI", "colorgrp":"blue" , "roc2":-6.49 , "roc3":-5.56, "pop100k":12.66, "size":4},
		{"name":"IA", "colorgrp":"blue" , "roc2":1.69 , "roc3":0, "pop100k":29.49, "size":6},
		{"name":"IL", "colorgrp":"blue" , "roc2":0 , "roc3":-7.62, "pop100k":126.74, "size":20},
		{"name":"MA", "colorgrp":"blue" , "roc2":-2.3 , "roc3":-8.24, "pop100k":64.53, "size":11},
		{"name":"MD", "colorgrp":"blue" , "roc2":1.37 , "roc3":0, "pop100k":55.83, "size":10},
		{"name":"ME", "colorgrp":"blue" , "roc2":-6.17 , "roc3":-2.63, "pop100k":13.12, "size":4},
		{"name":"MI", "colorgrp":"blue" , "roc2":-13.1 , "roc3":-12.7, "pop100k":100.91, "size":16},
		{"name":"MN", "colorgrp":"blue" , "roc2":-16.28 , "roc3":-4.17, "pop100k":51.07, "size":10},
		{"name":"NH", "colorgrp":"blue" , "roc2":-9.23 , "roc3":-11.86, "pop100k":13.01, "size":4},
		{"name":"NJ", "colorgrp":"blue" , "roc2":-1.05 , "roc3":3.19, "pop100k":86.22, "size":14},
		{"name":"NM", "colorgrp":"blue" , "roc2":14.29 , "roc3":-11.36, "pop100k":19.17, "size":5},
		{"name":"NY", "colorgrp":"blue" , "roc2":-2.33 , "roc3":-4.76, "pop100k":193.31, "size":29},
		{"name":"OR", "colorgrp":"blue" , "roc2":-7.76 , "roc3":-9.35, "pop100k":36.18, "size":7},
		{"name":"PA", "colorgrp":"blue" , "roc2":4.82 , "roc3":-8.05, "pop100k":124.18, "size":20},
		{"name":"RI", "colorgrp":"blue" , "roc2":2.7 , "roc3":-9.65, "pop100k":10.65, "size":4},
		{"name":"VT", "colorgrp":"blue" , "roc2":-13.89 , "roc3":-9.68, "pop100k":6.19, "size":3},
		{"name":"WA", "colorgrp":"blue" , "roc2":2.17 , "roc3":-1.06, "pop100k":62.61, "size":12},
		{"name":"WI", "colorgrp":"blue" , "roc2":-7.69 , "roc3":-3.57, "pop100k":55.41, "size":10}
	     ]
	    },
	    {
	     "name": "red",
	     "children": [
		{"name":"AK", "colorgrp":"red" , "roc2":-4.94 , "roc3":2.6, "pop100k":6.69, "size":3},
		{"name":"AL", "colorgrp":"red" , "roc2":-11.11 , "roc3":9.38, "pop100k":45.45, "size":9},
		{"name":"AZ", "colorgrp":"red" , "roc2":5.21 , "roc3":-1.98, "pop100k":59.75, "size":6},
		{"name":"GA", "colorgrp":"red" , "roc2":0.98 , "roc3":1.94, "pop100k":90.97, "size":16},
		{"name":"ID", "colorgrp":"red" , "roc2":15.79 , "roc3":5.68, "pop100k":14.26, "size":4},
		{"name":"IN", "colorgrp":"red" , "roc2":-6.48 , "roc3":-15.84, "pop100k":62.53, "size":11},
		{"name":"KS", "colorgrp":"red" , "roc2":-4.17 , "roc3":-2.9, "pop100k":27.42, "size":6},
		{"name":"KY", "colorgrp":"red" , "roc2":-7.21 , "roc3":-5.83, "pop100k":41.82, "size":8},
		{"name":"LA", "colorgrp":"red" , "roc2":3.75 , "roc3":-2.41, "pop100k":44.98, "size":8},
		{"name":"MS", "colorgrp":"red" , "roc2":5.94 , "roc3":2.8, "pop100k":29, "size":6},
		{"name":"MT", "colorgrp":"red" , "roc2":14.52 , "roc3":9.86, "pop100k":9.35, "size":3},
		{"name":"NC", "colorgrp":"red" , "roc2":-4.5 , "roc3":-1.89, "pop100k":86.69, "size":15},
		{"name":"ND", "colorgrp":"red" , "roc2":-10.64 , "roc3":-9.52, "pop100k":6.35, "size":3},
		{"name":"NE", "colorgrp":"red" , "roc2":-2 , "roc3":-10.2, "pop100k":17.52, "size":5},
		{"name":"OK", "colorgrp":"red" , "roc2":4.35 , "roc3":-16.67, "pop100k":35.33, "size":7},
		{"name":"SC", "colorgrp":"red" , "roc2":-9.02 , "roc3":0.9, "pop100k":42.56, "size":9},
		{"name":"SD", "colorgrp":"red" , "roc2":-6.25 , "roc3":2.22, "pop100k":7.8, "size":3},
		{"name":"TN", "colorgrp":"red" , "roc2":-14.16 , "roc3":5.15, "pop100k":59.96, "size":11},
		{"name":"TX", "colorgrp":"red" , "roc2":1.2 , "roc3":4.76, "pop100k":228.02, "size":38},
		{"name":"UT", "colorgrp":"red" , "roc2":9.86 , "roc3":-1.28, "pop100k":25, "size":6},
		{"name":"VA", "colorgrp":"red" , "roc2":-1.41 , "roc3":-10, "pop100k":75.64, "size":13},
		{"name":"WY", "colorgrp":"red" , "roc2":4.69 , "roc3":-16.42, "pop100k":5.06, "size":3}
	     ]
	    },
	    {
	     "name": "purple",
	     "children": [
		{"name":"AR", "colorgrp":"purple" , "roc2":2.6 , "roc3":8.86, "pop100k":27.76, "size":11},
		{"name":"CO", "colorgrp":"purple" , "roc2":3.49 , "roc3":-2.25, "pop100k":46.61, "size":9},
		{"name":"FL", "colorgrp":"purple" , "roc2":5.56 , "roc3":-2.63, "pop100k":177.84, "size":29},
		{"name":"MO", "colorgrp":"purple" , "roc2":-4.04 , "roc3":-5.26, "pop100k":58.07, "size":10},
		{"name":"NV", "colorgrp":"purple" , "roc2":23.14 , "roc3":-9.4, "pop100k":24.09, "size":6},
		{"name":"OH", "colorgrp":"purple" , "roc2":-6.48 , "roc3":-8.91, "pop100k":114.75, "size":18},
		{"name":"WV", "colorgrp":"purple" , "roc2":3.49 , "roc3":-3.37, "pop100k":18.04, "size":5}
	     ]
	    }
	 ]
	}
}