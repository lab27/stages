//'use strict';

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audioElement');
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 32
    console.log(analyser.fftSize)

    // bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);


    // var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    var frequencyData = new Uint8Array(16);

    // var myRadius = $("#meter").getOuterWidth()/2
    var svgHeight = 200,
        svgWidth = 200;

    //var svg = d3.select('#connection-circle-svg')

    // continuously loop and update chart with frequency data.
    function renderChart(el,radius2) {
        //console.log("My element: "+ el + ", or my element: " + $(el))
        console.log('radius2: '+radius2)
        var svg = d3.select(el)
        requestAnimationFrame(function(){renderChart(el)});

        // copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);
        //console.log(frequencyData)
        //var reducedData = frequencyData.slice(2,3);
        //console.log("fregData:" + frequencyData)
        var volume = frequencyData.reduce(function(sum,amp){
        return sum + amp
        }, 0);
        volume = volume/16;

        //console.log("vol: " + volume);

        // scale things to fit
        var pow = d3.scale.pow()
        pow.exponent([.5])
        var radiusScale = pow
            .domain([0, 255])
            .range([20, svgHeight/2]);

        // var hueScale = d3.scale.linear()
        //     .domain([0, d3.max(frequencyData)])
        //     .range([0, 360]);

       // update d3 chart with new data
       var circles = svg
           .data([volume]);

        circles.enter().append('circle');

        circles
            .attr({
                r: radius2,

                //cx: svgWidth / 2,
                //cy: svgHeight / 2,
                fill: vrGreen,
                'opacity':volume/200,
                'class':'meter'
                //'stroke-width': volume/5,
                //'stroke-opacity': volume/100,
                //'stroke-dasharray': volume/10,
                //'stroke-dashoffset':volume,
                //stroke: "none"
           });

        circles.exit().remove(); 
    }

    // run the loop

    //renderChart();
