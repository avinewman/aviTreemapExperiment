/*
function real_ajax(username, project, callback) {
    $.ajax({url: “/some/url/” + username + "/" + project + "/",
                type: “POST”,
                success: callback,
                error: function(x) { alert(“Error, got “ + x + “ from server!!!”); }
    });
}
*/

function doQuery(username, project)
{
	console.log("doQuery called!  username = " + username + " project = " + project);	
	//mock_ajax(username, project, function(data) {
	//	console.log("Got Matt's value=" + data["matt"] + " from server!!!");
	//});
	
	mock_ajax(username, project, function(data) {
		print_data2(data);
	})
	
	mock_ajax(username, project, function(data) {
		create_treemap(data);
	});
}

function mock_ajax(username, project, callback) {
	data = get_mock_data2();
    callback(data);
}

function get_mock_data()
{
	var dict = {};
	dict.avi = 10;
	dict.jj = 20;
	dict.matt = 35;
	dict.dogbert = 3;
	dict.garfield = 0;
	return dict;
}

function get_mock_data2()
{
	var data = [{"name":"levelone","elements": [
	    	{"name":"one", "sizes":12, "time":2},
    	{"name":"aatwo", "sizes":18,"time":12},
    	{"name":"bbbtwo", "sizes":18,"time":28},
    	{"name":"wwwthree","sizes":2,"time":10},
    	{"name":"wwwfour","sizes":50,"time":14},
    	{"name":"three","sizes":2,"time":30},
    	{"name":"four","sizes":50,"time":16}]}];
	return data;
}

function print_data(data)
{	
	for (var key in data) {
		if (!data.hasOwnProperty(key)) continue;
		console.log(key + "-->" + data[key]);	
	}
}

function print_data2(data)
{	
	for (var root in data) {
		if (!data.hasOwnProperty(root)) continue;
		var dict = data[root];
		for (var key in dict) {
			if (!dict.hasOwnProperty(key)) continue;
			console.log(key + "-->" + dict[key]);
		}
	}
}

/*
function create_treemap(data) {
	alert("111");
  
	d3.json("../data/flare2.json", function(json) {
		create_treemap3(json);
	alert("222");
	});
}	

function create_treemap3(data)
{
  div.data([json]).selectAll("div")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .call(cell)
      .text(function(d) { return d.children ? null : d.name; });


  d3.select("#size").on("click", function() {
    div.selectAll("div")
        .data(treemap.value(function(d) { return d.size; }))
      .transition()
        .duration(1500)
        .call(cell);

    d3.select("#size").classed("active", true);
    d3.select("#count").classed("active", false);
  });

  d3.select("#count").on("click", function() {
    div.selectAll("div")
        .data(treemap.value(function(d) { return 1; }))
      .transition()
        .duration(1500)
        .call(cell);

    d3.select("#size").classed("active", false);
    d3.select("#count").classed("active", true);
  });
}
*/

function create_treemap(data)
{
	alert("1");
	var childrenFunction = function(d){return d.elements};
    var sizeFunction = function(d){return d.sizes;};
    var colorFunction = function(d){return d.time;};
    var nameFunction = function(d){return d.name;};
 
    var color = d3.scale.linear()
                .domain([0,10,15,20])
                .range(["grey","green","yellow","red"]);
	alert("2");
 
    drawTreemap(500, 1000, '#chart', data, childrenFunction, nameFunction, sizeFunction, colorFunction, color);
}

function drawTreemap(height,width,elementSelector,data,childrenFunction,nameFunction,sizeFunction,colorFunction,colorScale){
 
    var treemap = d3.layout.treemap()
        .children(childrenFunction)
        .size([width,height])
        .value(sizeFunction);
 
    var div = d3.select(elementSelector)
        .append("div")
        .style("position","relative")
        .style("width",width + "px")
        .style("height",height + "px");
 
    console.log("treemap.nodes: " + treemap.nodes(data));
 
    div.data(data).selectAll("div")
        .data(function(d){return treemap.nodes(d);})
        .enter()
        .append("div")
        .attr("class","cell")
        .style("background",function(d){ return colorScale(colorFunction(d));})
        .call(cell)
        .text(nameFunction);
	console.log("treemap.nodes2: " + treemap.nodes(data));

}
 
function cell(){
    this.style("height",function(d){return d.dy - 1 + "px";});
}
/*        .style("left",function(d){return d.x + "px";})
        .style("top",function(d){return d.y + "px";})
        .style("width",function(d){return d.dx - 1 + "px";})
        .style("height",function(d){return d.dy - 1 + "px";});
}*/
