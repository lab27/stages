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


    var svgHeight = 168,
        svgWidth = 168;

    //var svg = d3.select('#connection-circle-svg')

    // continuously loop and update chart with frequency data.
    function renderChart(el) {
        //console.log("My element: "+ el + ", or my element: " + $(el))
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
       var circles = svg.selectAll('circle')
           .data([volume]);

        circles.enter().append('circle');

        circles
            .attr({
                r: function(d) { return radiusScale(d); },
                cx: svgWidth / 2,
                cy: svgHeight / 2,
                fill: 'none',
                'opacity':1,
                'stroke-width': volume/5,
                'stroke-opacity': volume/100,
                //'stroke-dasharray': volume/10,
                //'stroke-dashoffset':volume,
                stroke: "#d8f793"
           });

        circles.exit().remove(); 
    }

    // run the loop

    //renderChart();
