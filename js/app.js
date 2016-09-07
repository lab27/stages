var brdcst = $("#stream-circle");
var pauseBtn = document.getElementsByClassName("pause");
var startBtn = $('#logo');
var panelSize = $('.panelbox').outerWidth();
var serverCirclePos = $('#server-circle-svg').offset()
//var btnBbox = $("#stream .button")[0].getBBox();
var listOpen = false
var helpOpen = false
var adviceCount = -1;
var adviceShowing = false
var talkbarHeight;
//Spotlight
var sl = [{thing: $('#venue-title'), diameter: 300, msg:"This is the name of your stage."},
		{thing: $('#back-arrow'), diameter: 150, msg: "See all your stages."},
		{thing: $('#list-toggle'), diameter: 150, msg: "See the list of all talks."},
		{thing: $('#current-talk-title .next-talk'), diameter: 200, msg: "The current of next talk."},
		{thing: $("#server"), diameter: 400, msg: "Control your server."},
		{thing: $("#source"), diameter: 400, msg: "Control your audio source."},
		{thing: $("#stream"), diameter: 400, msg: "Control your live stream."},
		{thing: $(".autoplay-switch"), diameter: 300, msg: "Set your talks to stream automatically."},
		{thing: $("#help-link"), diameter: 200, msg: "Help and info about the control panel."}];

var adviceMessages = [
	{message: "You're a little early. You can come back tomorrow at 14:30."},
	{message: "Good news! Your server can be started."},
	{message: "Excellent! Your server is up and running. Now it's time to choose how you'll stream."},
	{message: "Heads up! Your talk is scheduled to start soon."},
	{message: "You're on the air!"},
	{message: "Oops! We lost you.   "},
	{message: "Aaaaand, we're back.  "}]

	//TL max:
var tmax_options = {
  delay: 0,
  paused: false,
  onComplete: function() {
    console.log('animation is complete');
  },
  onCompleteScope: {},
  tweens: [],
  stagger: 0,
  align: 'normal',
  useFrames: false,
  onStart: function() {
    console.log('on start called');
    showNextMsg();
  },
  onStartScope: {},
  onUpdate: function() {
    console.log('on update called');
  },
  onUpdateScope: {},
  onRepeat: function() {
    console.log('on repeat called');
  },
  onRepeatScope: {},
  onReverseComplete: function() {
    console.log('on reverse complete');
  },
  onReverseCompleteScope: {},
  autoRemoveChildren: false,
  smoothChildTiming: false,
  repeat: 0,
  repeatDelay: 0,
  yoyo: false,
  onCompleteParams: [],
  onReverseCompleteParams: [],
  onStartParams: [],
  onUpdateParams: [],
  onRepeatParams: []
};

//advice message timeline
var adviceMessageTL = new TimelineMax(tmax_options)


var hideAdvice = function(){
	console.log("hide advice")
	//move it away
	TweenMax.to($('#advice-message-box'),.2,{autoAlpha: 0, top:-200,left:"50%",ease:Power2.easeOut, onComplete:function(){
		
		adviceCount ++
		adviceShowing=false
		TweenMax.to($('#advice-messages-bg'),.2,{autoAlpha:0})
		console.log("new msg: " + adviceMessages[adviceCount].message)
		$('#advice-message-box p').html(adviceMessages[adviceCount].message)
	}})
};

var showAdvice = function(){
	console.log("show advice")
	console.log("counter: " + adviceCount)
	//load the message
	//$('#advice-message-box p').html(adviceMessages[num].message)
	//load positions
	var myMarginLeft = -1*($('#advice-message-box').outerWidth()/2)
	var myMarginTop = -1*($('#advice-message-box').outerHeight()/2)
	//move it into place
	adviceMessageTL
		.to($('#advice-messages-bg'),.2,{autoAlpha:1})
		.to($('#advice-message-box'),.3,{autoAlpha: 1,top:200,left:"50%",marginLeft:myMarginLeft,marginTop:myMarginTop,ease:Power2.easeOut,onComplete:function(){
			adviceShowing=true
		}})
};

$('#close-advice').on('click',function(){
	hideAdvice()
});


// $('#venue-title').on('click',function(){
// 	showAdvice()
// });

//slCounter 
var slCounter = -1;

//show autoplay switch
$('.stream-switch').removeClass('hide')

//move and show the spotlight message
var slmb = $('#spotlight-msg')
var slmbMT = -1*($('#spotlight-msg').outerHeight()/2)
var slmbML = -1*($('#spotlight-msg').outerWidth()/2)
console.log('outerWidth: '+ slmbML)
TweenMax.set(slmb,{left:"50%", top: "50%", marginTop: slmbMT, marginLeft: slmbML})
TweenMax.to(slmb,1,{opacity:1})
//TweenMax.to($('#spotlight-msg'),.2

//colors: 
var vrBlue 		= "#2c46b0",
	vrLtBlue 	= "#54c6c6",
	vrRed 		= "#f82847",
	vrGreen 	= "#60BD70",
	vrYellow 	= "#ffed00",
	vrPurple 	= "#a339cd",
	vrBeige 	= "#fef1de";
	neutralColor=	"#b4b6be";

$(startBtn).on('click',function(){
	$('#audioElement').trigger('play');
	//$('#stream-circle').addClass('success')
	//$(this).addClass('hide')
	//renderChart()
});




$(window).on('resize', function(){
	//console.log('resize windw')
	panelSize = $('.panelbox').outerWidth();
	console.log('panelSize: '+panelSize)
	$('#talkbar').removeAttr( "style" )

});

//Set up the messages:
var msgBox = $('.messagebox')
TweenMax.set(msgBox, {autoAlpha:0,marginTop:"100px"})

//message counter
var currentMsg = 0;
var nextMsg = 1;

//show the next msg
var showNextMsg = function() {
	console.log("show next message called")
	//console.log("next msg: " + nextMsg.attr('id'))


	var targetMsgBox = $('#messagebox'+currentMsg)
	var nextMsgBox = $('#messagebox'+nextMsg)
	console.log("target: " + targetMsgBox.attr('id'))
	$(nextMsgBox).removeClass('hide')
	//tl.play()
	TweenMax.to(targetMsgBox,.5,{autoAlpha:0,ease:Power2.easeOut, onComplete:function(){
		$(targetMsgBox).remove()
		TweenMax.to(nextMsgBox,.5,{autoAlpha:1,marginTop:"0%",ease:Power2.easeOut, onComplete:function(){
					nextMsg += 1
		currentMsg += 1
		}})
	}})
};

//temp trigger with Logo
$('.avatar').on('click',function(){
	if(adviceShowing==true){
		hideAdvice()
	}
	$('#server-button').removeClass('hide').addClass('pulse')
	showAdvice()
	tl.play()

});



//start server
$('#server .button').on('click',function(){
	TweenMax.to($(this),.5,{autoAlpha:0,scaleX:0,scaleY:0,ease:Power2.easeOut})
	//showNextMsg()
	hideAdvice()
	tl.play()
})

//launch device selector 
$('#circleButton').on('click',function(){
	TweenMax.to($(this),.2,{autoAlpha:0})
	if(adviceShowing==true){
		hideAdvice()
	}
	launchDeviceSelector()
});

$('.box-select').on('click',function(){
	dstl.play()
})

$('.box2-select').on('click',function(){
	dstl.play()
})

$('#stream .button').on('click',function(){
	tl.play()
	if(adviceShowing==true){
		hideAdvice()
	}
})


//toggle help
$('#help-link').on('click',function(){
	TweenMax.to($('#helpbar'),.2,{autoAlpha:1})
});

$('#close-help').on('click',function(){
	TweenMax.to($('#helpbar'),.2,{autoAlpha:0})
});

var listToggle = new TimelineMax(tmax_options),
				listBox = $('#talkbar');

//listToggle.fromTo(listBox,.3,{height: "100vh"},{height:"60px"})

$('#list-toggle a').on('click', function(){
	
	if (listOpen == false) {
	//store height:
	talkbarHeight = $('#talkbar').outerHeight()+"px"
	talkbarHeight=talkbarHeight.toString()
	console.log('outerheight of talkbar: '+ talkbarHeight)
	//open the list
	TweenMax.to(listBox,.3,{height:"auto",ease:Power2.easeOut,onComplete:function(){
		listOpen = true
	}})
	} else {
		//close the list
	console.log("what is talkbar height still: " + talkbarHeight)
	TweenMax.to(listBox,.3,{height:talkbarHeight,ease:Power2.easeOut,onComplete:function(){
		listOpen = false
	}})
	}
})


$('.list-open').on('click',function(){
	//close the list
	console('close this list!')
	TweenMax.to(listBox,.3,{height:"60px",ease:Power2.easeOut})
})

var tl = new TimelineMax(tmax_options),
				  circles = $('#circles svg'),
				  bases = $('#circles .base'),
				  buttons = $('#circles .button'),
				  serverCircle = $('#server path.overlay'),
				  spotlight = $('#spotlight'),
				  spotlightMsg = $('#spotlight-msg'),
				  connectionCircle = $('#source path.overlay'),
				  broadcastCircle = $('#stream path.overlay'),
				  panelCircle = $('#panels svg')
				  serverCheck = $('#server polyline.check'),
				  connectionCheck = $('#source .check'),
				  connectionMeter = $('#source circle'),
				  broadcastMeter = $('#stream circle'),
				  broadcastCheck = $('#stream .check'),
				  serverBtn = $('#server .button'),
				  connectionBtn = $('#source .button'),
				  broadcastBtn = $('#stream .button'),
				  deviceSelectorLi = $('#devices ul li'),
				  deviceSelectorUl = $('#devices ul'),
				  devices = $('#devices'),
				  spokes1 = $('#source-circle-svg #spokes'),
				  spokes2 = $('#stream-circle-svg #spokes'),
				  dstl = new TimelineMax(tmax_options);


TweenMax.set(circles,{strokeWidth:5,autoAlpha: 0,fill: "none",stroke:neutralColor })
TweenMax.set(serverCircle,{drawSVG: "0%",transformOrigin: "50% 50%",stroke:vrLtBlue,rotation:-90})
TweenMax.set($('polyline.check'),{drawSVG: "0%",stroke:vrGreen})
TweenMax.set(deviceSelectorLi,{autoAlpha:0,paddingTop:"60px"})
TweenMax.set(devices,{autoAlpha:0})
//TweenMax.set($('#screen2'),{x:"100%"})
TweenMax.set($('svg circle'),{autoAlpha:0})


//animate the device selector:
var launchDeviceSelector = function(){

TweenMax.set(deviceSelectorLi,{className:"-=hide"})
TweenMax.set(devices,{className:"-=hide"})

dstl.to(devices,.5,{autoAlpha:1})
	.staggerTo(deviceSelectorLi,.5,{autoAlpha:1,paddingTop:0},.2)
	.addPause()
	.to($('#screen1'),.3,{x:"-100%",ease:Power2.easeOut, onComplete:function(){
		$('#screen1').remove()
	}})
	.set($('#screen2'),{className:'-=hide'})
	.to($('#screen2'),.3,{x:"0%",ease:Power2.easeOut})
	.addPause()
	.to(devices,.3,{y:"-150%",ease:Power2.easeOut, onComplete:function(){
		console.log('closed the device selector')
		ringsTL.play()
	}});
}




//Spotlight:
var showSpotlight = function(o) {
	var curSl = slCounter + 1
	var totalSl = sl.length 
	console.log('showing spotlight ' + curSl + " of " + totalSl)
	var btnText = "Next"
	var cancelBtnText = "Skip tour"
	console.log("object: " + JSON.stringify(o).innerHTML)
	o.width=o.diameter;
	o.height=o.diameter;
	o.marginLeft = (-1*(o.diameter/2))
	o.marginTop = (-1*(o.diameter/2))
	o.top = o.thing.offset().top + (o.thing.outerHeight()/2)
	o.left = o.thing.offset().left + (o.thing.outerWidth()/2)
	msg = o.msg
	o.onComplete = function(){
		// TweenMax.set(slmb,{left: "50%",top:"50%", marginLeft: slmb.outerWidth()/2, marginTop: slmb.outerHeight()/2})

		$('#spotlight-msg #msg').html(msg)
		if (curSl == totalSl) {
		$('#spotlight-msg .spotlight-btn').html("Go it!")
		$('#spotlight-msg .cancel-btn').addClass('hide')
		} else {
			
		$('#spotlight-msg .spotlight-btn').html(btnText)
		$('#spotlight-msg .cancel-btn').html(cancelBtnText)
		}

	}
	TweenMax.to($("#spotlight"),.2,o);
	TweenMax.to(slmb,.2,{left: "50%",top:"50%", marginLeft: -1*(slmb.outerWidth()/2), marginTop: -1*(slmb.outerHeight()/2)})
}

var nextSpotlight = function(){
	slCounter ++;
	// console.log('slcounter: ' + slCounter + ", sl.length: " + sl.length)
	if (slCounter >= sl.length) {
		$("#spotlight").addClass('hide')
		$("#spotlight-msg").addClass('hide')
		showAdvice()
	} else {

	showSpotlight(sl[slCounter])
	}
}



var checkCheck = function(){
	setInterval(justChecking(), 1000)

}

//go to next spotlight 
$('.spotlight-btn').on('click',nextSpotlight);
$('.cancel-btn').on('click',function(){
	$("#spotlight").addClass('hide')
	$("#spotlight-msg").addClass('hide')
	showAdvice()

});

$('#server text tspan').html('launch')

//TweenMax.staggerTo(panelCircle,1,{scaleX: 1, scaleY: 1, autoAlpha:1, ease: Power2.easeOut},.2)
//TweenMax.set(circles,{strokeWidth:0,autoAlpha:0})
tl
	.staggerTo(circles,1,{strokeWidth:5, autoAlpha:1, ease: Power2.easeOut})
	.addPause()
	//show server button 
	.to($('#server .button'),.2,{autoAlpha:1})
	.to($('#server text'),.2,{autoAlpha:1,fill: "white"})
	.addPause()
	//make the server startup:
	.to($('#server text'),.2,{fill:vrLtBlue,onComplete:function(){
		$('#server text tspan').html('launching')
	}})
	.to(serverCircle,1,{drawSVG:"100%"})
	.to($('#server text'),.2,{autoAlpha:0})
	.to(serverCircle,.5,{stroke:vrGreen,onComplete:showAdvice})
	.to(serverCheck,.2,{drawSVG:"100%", ease: Power2.easeOut})
	//unite server with source
	.set($('#source .bg'),{stroke:"#eee",strokeWidth:15,fill:"#eee"})
	.to($('#source .overlay'),.2,{stroke:"#eee",strokeWidth:5,stroke:neutralColor})
	.to($('#server'),1,{x:"90%",ease:Power2.easeOut})
	// .set(serverCircle,{strokeDasharray:"50%",strokeDashoffset:"25%",strokeLinecap:"round"})
	// .set($('#server .base'),{stroke:"#eee"})
	// .set($('#server .bg'),{autoAlpha:0})
	//show button
	.to(connectionBtn,.2,{autoAlpha:1,onComplete:function(){
		$('#source text tspan').html('select')
	}})
	.to($('#source text'),.2,{autoAlpha:1,fill:"white"})
	.addPause()
	//make connection progress:
	.set(serverBtn,{autoAlpha:0})
	.set(connectionBtn,{autoAlpha:0})
	.set($('#source .base'),{stroke:"#eee"})
	.to($('#source text'),.2,{fill:vrLtBlue})
	.set(connectionCircle,{autoAlpha:1,stroke:vrLtBlue,strokeDasharray:"10 10",onComplete:function(){
		$('#source text tspan').html('connecting...')
	}})
	.to(connectionCircle,5,{autoAlpha:1,stroke:vrLtBlue,strokeDashoffset:-50})
		
	// make connection success:
	.to(connectionCircle,.2,{autoAlpha:1,stroke:vrGreen,strokeDasharray:"none"})
	.to($('#source text'),.2,{autoAlpha:0})
	.to(connectionCheck,.2,{drawSVG:"100%", ease: Power2.easeOut,onComplete:function(){
		$('#audioElement').trigger('play');
		console.log('should be playing audio')
		TweenMax.set(connectionMeter,{stroke:vrGreen,autoAlpha:.5})
		renderChart("#meter")
	}})
	.to(connectionCheck,.2,{drawSVG:"100% 100%",ease:Power2.easeOut})
	.to(broadcastBtn,.2,{autoAlpha:1,onComplete:function(){
		$('#stream text tspan').html('start')
	}})
	.to($('#stream text'),.2,{autoAlpha:1,fill:"white"})
	//.to(broadcastCircle,.5,{autoAlpha: 1, stroke:vrYellow},"+=5")
	//.set(broadcastBtn,{className:"-=success"})
	.set(broadcastBtn,{className:"+=pulse",onComplete:showAdvice})
	//.set(broadcastBtn,{className:"+=pulse"})
	.addPause()
	//make it sstream!
	.to($('#stream text'),.2,{autoAlpha:0})
	.to($('#stream .base'),.2,{stroke:vrGreen})
	.set($('#stream .overlay'),{drawSVG:"0%",transformOrigin: "50% 50%",stroke:"rgba(0,0,0,.3)",rotation:-90})
	.to(broadcastCheck,.2,{drawSVG:"100%", ease: Power2.easeOut,onComplete:function(){
		//show advice here?
		TweenMax.set(broadcastMeter,{stroke:vrGreen,autoAlpha:.5})
		renderChart("#stream")
		TweenMax.to(broadcastBtn,.2,{autoAlpha:0})
		showAdvice()
	}})
	//unite them
	.set(connectionCheck,{autoAlpha:0})
	.set(connectionMeter,{autoAlpha:0})
	.to($('#stream .bg'),.2,{autoAlpha:1,fill:"#eee",strokeWidth:15, stroke: "#eee"})
	.to($('#stream'),1,{x:"-90%",ease:Power2.easeOut,onComplete:function(){
		$('#stream text tspan').html('stop')
	}})
	//make the stop button
	// .to(broadcastCheck,.2,{autoAlpha:0,onComplete:function(){
	// 	//btnBbox = $('#stream .button')[0].getBBox()
	// }})
	// .to($('#stream .button'),.2,{
	// 	className:"-=pulse",
	// 	transformOrigin: "50% 50%",
	// })
	// .set($('#stream .button'),{scaleX:.4})
	// .set($('#stream .button'),{scaleY:.4})
	// .to($('#stream .button'),.2,{autoAlpha:1,fill:vrRed,transformOrigin: "50% 50%",
	// 	onComplete:function(){
	// 	$('#stream text tspan').html('stop')
	// }})
	.to(broadcastCheck,.2,{autoAlpha:0})
	.to($('#stream text'),.2,{autoAlpha:1,fill:vrRed,fontWeight:700})
	.to($('#stream .overlay'),10,{drawSVG:"5%"})
	//make it lose connection
	//.to($('#stream .button'),.2,{autoAlpha:0})
	.to($('#source .overlay'),.2,{stroke:neutralColor,onComplete:function(){
			$('#audioElement').trigger('pause');
			hideAdvice()
			$('#stream text tspan').html('dead air')
	}})
	.set(connectionCircle,{autoAlpha:1,strokeDashoffset:0,stroke:vrLtBlue,strokeDasharray:"10 10",onComplete:function(){
		$('#source text tspan').html('searching...')
	}})

	.to($('#source text'),.2,{autoAlpha:1,fill:vrLtBlue})
	.to($('#stream text'),.2,{autoAlpha:1,fill:neutralColor,fontWeight:300})
	.set(broadcastCheck,{autoAlpha:0})
	.set(connectionCheck,{autoAlpha:0})
	.set(broadcastMeter,{autoAlpha:0})
	.set(connectionMeter,{autoAlpha:0})
	.set($('#stream .base'),{stroke:neutralColor})
	.to($('#stream'),.5,{x:"0%",ease:Power2.easeOut,onComplete:showAdvice})
	.to(connectionCircle,5,{autoAlpha:1,stroke:vrLtBlue,strokeDashoffset:-50})
	//make it reconnect
	.to($('#source .overlay'),.2,{strokeDasharray:"none",stroke:vrGreen})
	.to($('#stream text'),.2,{autoAlpha:0})
	.to($('#stream .base'),.2,{stroke:vrGreen,onComplete:function(){
		TweenMax.set($('#source text'),{fill:vrGreen})
		$('#source text tspan').html('CONNECTED')
	}})
	.set($('#stream .overlay'),{drawSVG:"0%",transformOrigin: "50% 50%",stroke:"rgba(0,0,0,.3)",rotation:-90})
	.set(broadcastCheck,{drawSVG:"0%",autoAlpha:1})
	.to(broadcastCheck,.2,{drawSVG:"100%", ease: Power2.easeOut,onComplete:function(){
		hideAdvice()
		$('#audioElement').trigger('play');

		TweenMax.set(broadcastMeter,{stroke:vrGreen,autoAlpha:.5})
		renderChart("#stream")
		TweenMax.to(broadcastBtn,.2,{autoAlpha:0})
		showAdvice()
	}})
	.to($('#stream text'),.2,{autoAlpha:0,onComplete:function(){
		$('#stream text tspan').html('stop')
	}})
	.to($('#stream .base'),.2,{stroke:vrGreen})
	.set(connectionCheck,{autoAlpha:0})
	.set(connectionMeter,{autoAlpha:0})
	//.to($('#stream .button'),.2,{autoAlpha:1})
	//back together
	.to($('#stream'),.3,{x:"-90%",ease:Power2.easeOut})
		.to(broadcastCheck,.2,{autoAlpha:0})
	//.set($('#stream .button'),{className:"-=pulse"})
	//.to($('#stream .button'),.2,{autoAlpha:1})
	.to($('#stream text'),.2,{autoAlpha:1,fill:vrRed,fontWeight:700})
	.to($('#stream .overlay'),10,{drawSVG:"15%"})
	;

	$(document).ready(function(){
		$('.svg-circle').attr("class", "svg-circle");
		tl.play()
		hideAdvice()

	})

