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
    //showNextMsg();
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

//hover svg show labels 

$("#circles").on('mouseenter',function(){
	console.log("hovering svg")
	$("#circles svg g#ui-labels").css('opacity',1)
});

$("#circles").on('mouseleave',function(){
	console.log("leaving svg")
	$("#circles svg g#ui-labels").css('opacity',0)
});

//chat submit 
$('#chat-form').submit(function(event){
	console.log('submitted the form!!')
	event.preventDefault();
	//append the element with text from the input field
	var myMsg = $('#chat-form input').val()
	var myMsgSpan = $("<span/>", {class:"message-text"}).html(myMsg)
	var myTimeSpan = $("<span/>", {class:"message-time"}).html("10:30")
	var myLosenge = $("<div/>", {
    	class : "message-losenge right float-right"
  	}).append(myMsgSpan).append(myTimeSpan);
	var newChat = $("<div/>", {
    	class : "row message-row"
    	
  	}).append(myLosenge).insertAfter($('#message-container h4'));

	//animate it in:
	TweenMax.set(newChat,{autoAlpha:0,display:"none", transformOrigin: "50% 50%", marginTop:"-50px",scaleX:1.2,scaleY:1.2})
	TweenMax.to(newChat,.5,{autoAlpha:1, display: "block", scaleX:1, scaleY:1, marginTop:0, ease:Bounce.easeOut})
	//clear the input field
	$("#chat-form input").val('')
})

$('#chat-send').on('click',function(){
	$('#chat-form').submit()
})

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

// $(startBtn).on('click',function(){
// 	$('#audioElement').trigger('play');
// 	//$('#stream-circle').addClass('success')
// 	//$(this).addClass('hide')
// 	//renderChart()
// });
// var pauseTheSound = function(){
// 	console.log('pause the sound...')
// 	$('#audioElement')[0].pause();
// };

var playTheSound = function(){
	console.log('play the sound...')
	$('#audioElement')[0].play();
};



$("#toggles button").on('click',function(){
	console.log("clicked a toggle")
	playTheSound()
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
// var showNextMsg = function() {
// 	console.log("show next message called")
// 	//console.log("next msg: " + nextMsg.attr('id'))


// 	var targetMsgBox = $('#messagebox'+currentMsg)
// 	var nextMsgBox = $('#messagebox'+nextMsg)
// 	console.log("target: " + targetMsgBox.attr('id'))
// 	$(nextMsgBox).removeClass('hide')
// 	//tl.play()
// 	TweenMax.to(targetMsgBox,.5,{autoAlpha:0,ease:Power2.easeOut, onComplete:function(){
// 		$(targetMsgBox).remove()
// 		TweenMax.to(nextMsgBox,.5,{autoAlpha:1,marginTop:"0%",ease:Power2.easeOut, onComplete:function(){
// 					nextMsg += 1
// 		currentMsg += 1
// 		}})
// 	}})
// };

//temp trigger with Logo
$('.avatar').on('click',function(){
	if(adviceShowing==true){
		hideAdvice()
	}
	$('#server-button').removeClass('hide').addClass('pulse')
	//showAdvice()
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
		$('.see-all').html("hide").addClass("hide-all")
	}})
	} else {
		//close the list
	console.log("what is talkbar height still: " + talkbarHeight)
	TweenMax.to(listBox,.3,{height:talkbarHeight,ease:Power2.easeOut,onComplete:function(){
		listOpen = false
		$('.see-all').html("see all").removeClass("hide-all")
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
TweenMax.set($('#first-message'),{position:"relative",left:0,bottom:0})
TweenMax.set($('#first-message .message-losenge'),{background:vrBeige})

dstl.to(devices,.5,{autoAlpha:1})
	.staggerTo(deviceSelectorLi,.5,{autoAlpha:1,paddingTop:0},.2)
	.addPause()
	.to($('#screen1'),.3,{x:"-100%",ease:Power2.easeOut, onComplete:function(){
		$('#screen1').remove()
	}})
	.set($('#screen2'),{className:'-=hide'})
	.to($('#screen2'),.3,{x:"0%",ease:Power2.easeOut})
	.addPause()
	.to(devices,.3,{y:"-350%",ease:Power2.easeOut, onComplete:function(){
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
		//showAdvice()
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
	//showAdvice()

});

$('#server text tspan').html('launch')


//speaker activate
$('#speakers a').on('click',function(){
	$('#speakers a').each(function(){
		$(this).removeClass('active')
	})
	$(this).addClass('active')
});

		TweenMax.set($('#first-message'),{autoAlpha:0,display:"none",scaleX:1.2,scaleY:1.2})
		TweenMax.set($('#second-message'),{autoAlpha:0,display:"none",scaleX:1.2,scaleY:1.2})

	$(document).ready(function(){
		
		$('.svg-circle').attr("class", "svg-circle");
		//tl.play()
		//hideAdvice()

	})

$("#autostart-btn").on("click",function(){
	$(this).toggleClass("active")
})
