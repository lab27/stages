var svgWidth = 200;
var strokeWidth = 10;
var spacing = 5;
var radius1 = (svgWidth/2)-(strokeWidth/2);
var radius2 = (svgWidth/2)-strokeWidth-(strokeWidth/2)-spacing;
var radius3 = (svgWidth/2)-(strokeWidth*2)-(strokeWidth/2)-(spacing*2);

var svgContainer = d3.select("#circles").append("svg")
                                    .attr("viewBox", "0 0 " + svgWidth + " " + svgWidth);
                                  

//server base
var serverBase = svgContainer.append("circle")
	.attr("cx", "50%")
	.attr("cy", "50%")
	.attr("fill", "none")
	.attr("stroke-width", strokeWidth)
	.attr("r", radius1)
	.attr("class","base");

var serverOverlay = svgContainer.append("circle")
	.attr("cx", "50%")
	.attr("cy", "50%")
	.attr("fill", "none")
	.attr("stroke-width", strokeWidth)
	.attr("r", radius1)
	.attr("class","overlay")
	.attr("stroke","none");
                        
//source base
var sourceBase = svgContainer.append("circle")
	.attr("cx", "50%")
	.attr("cy", "50%")
	.attr("fill", "none")
	.attr("stroke-width", strokeWidth)
	.attr("r", radius2)
	.attr("class","base");

//stream base
var streamBase = svgContainer.append("circle")
	.attr("cx", "50%")
	.attr("cy", "50%")
	.attr("fill", "none")
	.attr("stroke-width", strokeWidth)
	.attr("r", radius3)
	.attr("class","base");

//set initial states:
TweenMax.set(serverOverlay,{rotation:-90,transformOrigin: "50% 50%",drawSVG:"0%",stroke:vrLtBlue})
//set up timeling
var ringsTL = new TimelineMax(tmax_options);
//server starts
ringsTL.to(serverOverlay,3,{drawSVG:"100%"})
//server turns green
.to(serverOverlay,.2,{stroke:vrGreen})
//server line shrinks
.to(serverOverlay,.2,{strokeWidth:5})