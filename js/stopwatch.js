// var counter = 0
// // $stopwatch = {
// //     el: document.getElementById('stopwatch'),
// //     container: document.getElementById('time-container')
// // };

// var serverUptime;
// var broadcastUptime;

// function justChecking(){
//     console.log('check: ' + this)
// }

// function displayTimeServer() {
//     console.log("running displayTimeServer")
//     //var myTime = moment().hour(0).minute(0).second(counter++).format('HH : mm : ss');
//     $('#stopwatch-server').innerHTML = moment().hour(0).minute(0).second(counter++).format('HH : mm : ss');
// }

// function displayTimeBroadcast() {
//     console.log("running displayTimeBroadcast")
//     var myTime = moment().hour(0).minute(0).second(counter++).format('HH : mm : ss');
//     $('#stopwatch-broadcast').text(myTime)
// }

// // function startWatchServer() {
// //     console.log("running startWatchServer")
// //     serverUptime = setInterval(displayTimeServer(), 1000);
// // }

// // function startWatchBroadcast() {
// //     console.log("running startWatchBroadcast")
// //     broadcastUptime = setInterval(displayTimeBroadcast(), 1000);
// // }

// // function stopWatch() {
// //     clearInterval(runClock);
// // }

// var startTime = moment();
// var currentTime;

//var timestamp = new Date(0,0,0,0,0,0);
var timestamp = new Date(0,0,0,0,0,0);
var interval = 1;

function startTimer()
 {
setInterval(function () {
    timestamp = new Date(timestamp.getTime() + 1000);
    
    //duration = moment.duration(duration.asSeconds() + interval, 'seconds');
    //.asSeconds() 
    //$('.countdown').text(Math.round(duration.asHours()) + 'h:' + Math.round(duration.asMinutes()) + 'm:' + Math.round(duration.asSeconds()) + 's'); //.seconds() 
    //$('.countdown1').text(duration.days() + 'd:' + duration.hours() + 'h:' + duration.minutes() + 'm:' + duration.seconds() + 's');
    $('#stopwatch-server').text(timestamp.getHours()+':'+timestamp.getMinutes()+':'+timestamp.getSeconds());
    
}, 1000);
//     setInterval(function() {
//         currentTime = moment();
//         //console.log(moment(origTime).format('h:mm:ss'))
//         document.getElementById('stopwatch-server').innerHTML = 
//             currentTime.diff(startTime,'hours') + ":" +
//             currentTime.diff(startTime,'minutes') + ":" +
//             currentTime.diff(startTime,'seconds');
//             //moment(startTime).format('hh:mm:ss');

//     }, 1000);
}


