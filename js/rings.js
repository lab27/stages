var svgWidth = 260;
var strokeWidth = 10;
var spacing = 5;
var radius1 = (svgWidth/2)-(strokeWidth/2);
var radius2 = (svgWidth/2)-strokeWidth-(strokeWidth/2)-spacing;
var radius3 = (svgWidth/2)-(strokeWidth*2)-(strokeWidth/2)-(spacing*2);
var interval = null;

var svgContainer = d3.select("#circles").append("svg")
                                    .attr("viewBox", "0 0 " + svgWidth + " " + svgWidth);
        
var buttonClickCounter = 0;       

var playRings = function(){
	ringsTL.play()
}                           

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

//stream overlay
var streamOverlay = svgContainer.append("circle")
	.attr("cx", "50%")
	.attr("cy", "50%")
	.attr("fill", "none")
	.attr("stroke-width", strokeWidth)
	.attr("r", radius3)
	.attr("class","overlay");

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

var stopText = svgContainer.append("text")
	.attr("x", "50%")
	.attr("height", 12)
	.attr("y", (svgWidth/2)+60)
	.attr("text-anchor", "middle")
	//.attr("class","hide")
	.attr("id","stopText")
	.attr("fill", vrRed)
	.html("Stop Streaming");


var UILabels = svgContainer.append("g")
	.attr("id","ui-labels");


var line1 = UILabels.append("line")
	.attr("x1","56.8")
	.attr("y1","31.8")
	.attr("x2","35")
	.attr("y2","10")
	.attr("stroke","#666")
	.attr("stroke-width",".5");

var line2 = UILabels.append("line")
	.attr("x1","57.6")
	.attr("y1","46.6")
	.attr("x2","35.5")
	.attr("y2","24.5")
	.attr("stroke","#666")
	.attr("stroke-width",".5");

var line3 = UILabels.append("line")
	.attr("x1","61.1")
	.attr("y1","64.6")
	.attr("x2","35.5")
	.attr("y2","38.9")
	.attr("stroke","#666")
	.attr("stroke-width",".5");

var serverLabel = UILabels.append("text")
	.attr("x", "1")
	.attr("height", 12)
	.attr("y", "10")
	.attr("text-anchor", "left")
	.attr("font-size", "8")
	.attr("id","server-label")
	.attr("fill", "#666")
	.html("server");

var sourceLabel = UILabels.append("text")
	.attr("x", "1")
	.attr("height", 12)
	.attr("y", "25")
	.attr("text-anchor", "left")
	.attr("font-size", "8")
	.attr("id","source-label")
	.attr("fill", "#666")
	.html("source");

var streamlabel = UILabels.append("text")
	.attr("x", "1")
	.attr("height", 12)
	.attr("y", "40")
	.attr("text-anchor", "left")
	.attr("font-size", "8")
	.attr("id","stream-label")
	.attr("fill", "#666")
	.html("stream");




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

//click away the first modal:
$("#main-modal #modal-box button").on('click',function(){
	ringsTL.play()
})

//set initial states:
TweenMax.set(serverOverlay,{rotation:-90,transformOrigin: "50% 50%",drawSVG:"0%",stroke:vrLtBlue})
TweenMax.set(streamOverlay,{rotation:-90,transformOrigin: "50% 50%",drawSVG:"0%",stroke:"black",strokeOpacity:".3"})
TweenMax.set(stopText,{autoAlpha:0})
//set up timeling
var ringsTL = new TimelineMax(tmax_options);
//server starts
ringsTL
.addPause()
.to($('#main-modal'),.2,{autoAlpha:0})
.to(serverOverlay,1,{drawSVG:"100%"})
//text goes away
.set(buttonText,{className:"+=hide"})
//server turns green
.add("shrinkit")
.to(serverOverlay,.2,{stroke:vrGreen,onComplete:function(){
	buttonText.html("select source").attr("fill","white")
}},"shrinkit")
//server lines shrink
.to(serverOverlay,.2,{strokeWidth:5,attr:{r:radius1-2.5},ease:Power2.easeOut},"shrinkit")
.to(serverBase,.2,{strokeWidth:5,attr:{r:radius1-2.5},ease:Power2.easeOut},"shrinkit")
// popup displays
.to($('#first-message'),.5,{autoAlpha:1, display: "block", scaleX:1, scaleY:1, ease:Bounce.easeOut})
//select source button appears
.to(button,.2,{attr:{r:radius3-spacing-strokeWidth}})
.set(buttonText,{className:"-=hide"})
.addPause()
//connecting
.to(buttonText,.2,{autoAlpha:1,fill:vrLtBlue})
.to(sourceBase,.2,{stroke:vrLtBlue,strokeDasharray:"4 8",className:"+=connecting",onComplete:playTheSound})
//connected (add meter)
.to(sourceBase,.2,{stroke:vrGreen,strokeDasharray:"0 0",onComplete:function(){
	
	buttonText.html('connected')
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
.to(button,.2,{className:"+=stream",cursor:"pointer",autoAlpha:1,attr:{r:radius3-spacing-strokeWidth-strokeWidth},onComplete:function(){
	buttonText.html("start stream")
}})
.addPause()
.to(streamBase,.2,{stroke:vrGreen})
.to(button,.2,{autoAlpha:0,onComplete:function(){
	TweenMax.set($('#second-message'),{position:"relative",left:0,bottom:0})
	TweenMax.set($('#second-message .message-losenge'),{background:vrYellow})
	TweenMax.to($('#second-message'),.5,{autoAlpha:1, display: "block", scaleX:1, scaleY:1, ease:Bounce.easeOut})
	var stopButton = svgContainer.insert("rect")
	.attr("rx", "2")
	.attr("ry", "2")
	.attr("width","15")
	.attr("height","15")
	.attr("x",svgWidth/2 - 7.5)
	.attr("y",svgWidth/2 + 30)
	.attr("fill",vrRed)
	.attr("id","stopButton")
	.on("click",playRings);
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
    interval = setInterval(function() {
       counter++;
       format(counter);
    },100);
})();
}})
.to(stopText,.2,{autoAlpha:1})
.to(buttonText,.2,{fill:"#666", onComplete:function(){
	//prepare the stopping early modal text
	$('#main-modal #modal-box p.lead').html('Are you sure you want to stop early?')
}})
.set(streamOverlay,{drawSVG:0})
.to(streamOverlay,10,{drawSVG:10})
.addPause()
//show stopping early modal
.set($('#main-modal .cancel'),{className:"-=hide", onComplete:function(){
	$('#main-modal #modal-box .yes').html("yes").on('click',playRings)
}})
.to($('#main-modal'),.2,{autoAlpha:1})
.addPause()
//hide modal
.to($('#main-modal'),.2,{autoAlpha:0})
//stream ring turns gray
.to(streamBase,.2,{stroke:"#bbb",onComplete:function(){
	console.log('finished making stream gray')
	//pauseTheSound()
	//hide stop button
	svgContainer.selectAll("rect#stopButton").attr("class","hide");
	clearInterval(interval)
	$('#chat-form input').val('The Talk has ended.')
	$('#chat-form').submit()
	$('#main-modal #modal-box p.lead').html('Please disconnect your streaming client...')
	$('#main-modal #modal-box .cancel').addClass('hide')
	$('#main-modal #modal-box .yes').addClass("hide")
	
}})
.to(stopText,.2,{autoAlpha:0})
// .to($('#main-modal'),.2,{autoAlpha:1,onComplete:function(){
// 	$('#main-modal #modal-box p.lead').html('Wud u lik 2 skdyl yr necks tok?')
// 	$('#main-modal #modal-box .cancel').removeClass('btn-red').html("No, thanks")
// 	$('#main-modal #modal-box .yes').html("yes").addClass("btn-green btn-hover-green").on('click',function(){
// 		//alert("nice one!")
// 		TweenMax.to($("#main-modal"),.2,{autoAlpha:0})

// 	})
// 	$('#main-modal #modal-box p.lead').html('Please disconnect your streaming client...')
// 	$('#main-modal #modal-box .cancel').addClass('hide')
// 	$('#main-modal #modal-box .yes').addClass("hide")
// }})
.to($('#main-modal'),.2,{autoAlpha:1,onComplete:function(){
	setTimeout(function(){
  		TweenMax.to($('#main-modal'),.2,{autoAlpha:0,onComplete:function(){

  			$('#audioElement')[0].pause();
  			$('#main-modal #modal-box p.lead').html('Wud u lik 2 skdyl yr necks tok?')
	$('#main-modal #modal-box .cancel').removeClass('btn-red').html("No, thanks")
	$('#main-modal #modal-box .yes').html("yes").addClass("btn-green btn-hover-green").on('click',function(){
		//alert("nice one!")
		TweenMax.to($("#main-modal"),.2,{autoAlpha:0})
	})
  		}})
	}, 3000);
	}})
.to(sourceBase,.2,{stroke:"#bbb",onComplete:function(){
	console.log('disconnected')
	
}})
.add("newtalk")
.to($('#main-modal'),.2,{autoAlpha:1},"newtalk")



