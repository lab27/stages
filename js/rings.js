var svgWidth = 200;
var strokeWidth = 10;
var spacing = 5;
var radius1 = (svgWidth/2)-(strokeWidth/2);
var radius2 = (svgWidth/2)-strokeWidth-(strokeWidth/2)-spacing;
var radius3 = (svgWidth/2)-(strokeWidth*2)-(strokeWidth/2)-(spacing*2);

var svgContainer = d3.select("#circles").append("svg")
                                    .attr("viewBox", "0 0 " + svgWidth + " " + svgWidth);
        
var buttonClickCounter = 0;                                  

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

//button
var button = svgContainer.append("circle")
	.attr("cx", "50%")
	.attr("cy", "50%")
	.attr("fill", vrGreen)
	.attr("r", 0)
	.attr("class","button")
	.attr("id","circleButton");

var buttonText = svgContainer.append("text")
	.attr("x", "50%")
	.attr("height", 12)
	.attr("y", (svgWidth/2)+3)
	.attr("text-anchor", "middle")
	//.attr("class","hide")
	.attr("id","buttonText")
	.attr("fill", vrLtBlue)
	.html("launching...");

//click events
button.on("click", function() {
	if (buttonClickCounter == 0){

	  launchDeviceSelector()
	  TweenMax.set(button,{autoAlpha:0})
	  TweenMax.set(buttonText,{autoAlpha:0})
	  buttonText.html("connecting...")
	  buttonClickCounter ++
	} else if (buttonClickCounter == 1){
		ringsTL.play()
		buttonClickCounter ++
	}
});



//set initial states:
TweenMax.set(serverOverlay,{rotation:-90,transformOrigin: "50% 50%",drawSVG:"0%",stroke:vrLtBlue})
//set up timeling
var ringsTL = new TimelineMax(tmax_options);
//server starts
ringsTL.to(serverOverlay,1,{drawSVG:"100%"})
.add("shrinkit")
//text goes away
.set(buttonText,{className:"+=hide"})
//server turns green
.to(serverOverlay,.2,{stroke:vrGreen,onComplete:function(){
	buttonText.html("select").attr("fill","white")
}},"shrinkit")
//server lines shrink
.to(serverOverlay,.2,{strokeWidth:5,attr:{r:radius1-2.5},ease:Power2.easeOut},"shrinkit")
.to(serverBase,.2,{strokeWidth:5,attr:{r:radius1-2.5},ease:Power2.easeOut},"shrinkit")
//select source button appears
.to(button,.2,{attr:{r:radius3-spacing-strokeWidth}})
.set(buttonText,{className:"-=hide"})
.addPause()
//connecting
.to(buttonText,.2,{autoAlpha:1,fill:vrLtBlue})
.to(sourceBase,.2,{stroke:vrLtBlue,strokeDasharray:"4 8",className:"+=connecting"})
//connected (add meter)
.to(sourceBase,.2,{stroke:vrGreen,strokeDasharray:"0 0",onComplete:function(){
	buttonText.html('connected')
	$('#audioElement').trigger('play');
	var sourceOverlay = svgContainer.insert("circle")
	.attr("cx", "50%")
	.attr("cy", "50%")
	//.attr("fill", "none")
	//.attr("stroke-width", strokeWidth)
	//.attr("r", radius2)
	.attr("id","meter")
	.attr("class","overlay");
	renderChart("#meter")
}},"+=2")
.set(sourceBase,{className:"-=connecting"})
.to(buttonText,.2,{fill:vrGreen})
//show stream button
.to(buttonText,.2,{fill:"white"})
.to(button,.2,{className:"=+stream",autoAlpha:1,attr:{r:radius3-spacing-strokeWidth-strokeWidth},onComplete:function(){
	buttonText.html("stream")
}})
.addPause()
.to(streamBase,.2,{stroke:vrGreen})
.to(button,.2,{autoAlpha:0,onComplete:function(){
	var stopButton = svgContainer.insert("rect")
	.attr("rx", "2")
	.attr("ry", "2")
	.attr("width","15")
	.attr("height","15")
	.attr("x",100-7.5)
	.attr("y",110)
	.attr("fill",vrRed)
	.attr("id","stopButton");
	(function() {
     var counter = 0,
     cDisplay = document.getElementById("buttonText");
     format = function(t) {
         var minutes = Math.floor(t/600),
             seconds = Math.floor( (t/10) % 60);
         minutes = (minutes < 10) ? "0" + minutes.toString() : minutes.toString();
         seconds = (seconds < 10) ? "0" + seconds.toString() : seconds.toString();
         cDisplay.innerHTML = minutes + ":" + seconds;
     };
    setInterval(function() {
       counter++;
       format(counter);
    },100);
})();
}})
