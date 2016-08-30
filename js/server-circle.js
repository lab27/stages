var path = document.querySelector('#server path#overlay');
var length = path.getTotalLength();
// Clear any previous transition
//path.style.transition = path.style.WebkitTransition =
  'none';
// Set up the starting positions
path.style.strokeDasharray = length + ' ' + length;
//path.style.strokeDashoffset = length;
// Trigger a layout so styles are calculated & the browser
// picks up the starting position before animating
path.getBoundingClientRect();
// Define our transition
//path.style.transition = path.style.WebkitTransition =
  //'stroke-dashoffset 30s linear';

var provisionServer = function(){

// Go!
//$('#start-server').toggle()
//path.style.strokeDashoffset = '0';
}; 


$('#start-server').on('click',provisionServer)
   // var svgCircle = d3.select('#server-circle-holder').append('svg')
   //      .attr({
                
   //              width: 160,
   //              height: 160,
                
   //         }).append("circle")
   //               .attr({
   //               	"cx": 80,
   //               	"cy": 80,
   //               	"r": 76,
   //               	fill: "none",
	  //               'opacity':1,
	  //               'stroke-width': 6,
	  //               'stroke-opacity': .4,
	  //               stroke: 'black'
   //           });

    // d3.select('#server-circle-holder svg').append("circle")
    //              .attr({
    //              	"cx": 80,
    //              	"cy": 80,
    //              	"r": 76,
    //              	fill: "none",
	   //              'opacity':1,
	   //              'stroke-width': 6,
	   //              'stroke-opacity': 1,
	   //              stroke: '#54c6c6',
	   //              'stroke-dasharray': '300,60'

    //          })


// function transition(circle) {
//   path.transition()
//       .duration(7500)
//       .attrTween("stroke-dasharray", tweenDash);
// }
                 

// function tweenDash() {
//   var l = this.getTotalLength(),
//       i = d3.interpolateString("0," + l, l + "," + l);
//   return function(t) { return i(t); };
// }

// ========

// var points = [
//   [80, 0],
//   [160, 80],
//   [80, 160],
//   [0, 80]
// ];

// var line = d3.svg.line()
//     //.tension(0) // Catmull–Rom
//     .interpolate("basis-closed");

// var svg = d3.select("#server-circle").append("svg")
//     .datum(points)
//     .attr("width", 180)
//     .attr("height", 180);



// svgCircle.append("circle")
//     .attr({
//                     "cx": 80,
//                     "cy": 80,
//                     "r": 76,
//                     fill: "none",
//                     'opacity':1,
//                     'stroke-width': 6,
//                     'stroke-opacity': .4,
//                     stroke: 'red'
//              })
//     .call(transition);

// function transition(circle) {
//   circle.transition()
//       .duration(7500)
//       .attrTween("stroke-dasharray", tweenDash);
// }

// function tweenDash() {
//   var l = this.getTotalLength(),
//       i = d3.interpolateString("0," + l, l + "," + l);
//   return function(t) { return i(t); };
// }