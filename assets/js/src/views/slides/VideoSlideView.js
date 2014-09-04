define(['var/querySelector', 'views/PersistentAnimSlideView'], function() {
var VideoSlideView;

(function() {

var canvas = $("#videoCanvas"),
    ctx = canvas.getContext("2d"),

    bgCanvas = document.createElement("canvas"),
    bgCtx = bgCanvas.getContext("2d"),

    canvasW,
    canvasH,
    imageData,
    keyword = "V I D E O",
    rowGap = 10,
    columnGap = 10,
    requestId,
    playing = false,
    particles;

 
var draw = function() {
    ctx.clearRect(0, 0, canvasW, canvasH);
    // add text shadows
    ctx.shadowColor = "#000";
    ctx.shadowBlur = "4";
    // draw
    var p,x,y;
    ctx.lineWidth = 1;
    for (var i = 0; i < particles.length; i++) {

        var width   = columnGap - 2,
            height  = rowGap;
        p = particles[i];
        x = p.x;
        y = p.y;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        ctx.beginPath();
        ctx.moveTo( x, y);

        // oscillate between a threshold
        ctx.lineTo(x + (2 + Math.random() * width), y);
    

        ctx.closePath();
        ctx.stroke();
       
    }
    if (playing) {
        requestId = requestAnimationFrame(draw);
    }
    
 };

    VideoSlideView = new PersistentAnimSlideView({
        el: $("#video"),
        setup: function() {
            if (!this.ready) {
                var textMetrics,
                    worker;
                canvasW = this.el.querySelector('.content-wrapper').offsetWidth;
                canvasH = this.el.querySelector('.content-wrapper').offsetHeight;

                canvas.width = canvasW;
                canvas.height = canvasH;
                bgCanvas.width = canvasW;
                bgCanvas.height = canvasH;


                bgCtx.font = "125px bold Oswald ";
                // Fill the keyword text onto the bgCanvas.
                textMetrics = bgCtx.measureText(keyword);
                // console.log(textMetrics);
                // draw text relative to its vertical middle
                bgCtx.textBaseline = "middle";
                bgCtx.fillText(keyword, ( canvasW / 2 ) - ( Math.round( textMetrics.width /2 ) ) , (canvasH / 2));
                imageData = bgCtx.getImageData(0, 0, canvasW, canvasH).data;
               
                // TODO resize text if too big
                worker = new Worker("js/thread/prepareVideoSlideView.min.js");
                worker.addEventListener("message", function(e) {
                    particles = e.data.message;
                    draw();
                    console.log(e.data);
                    worker.terminate();
                    worker = null;
                });

                // tell worker to begin image processing
                worker.postMessage({
                    canvasW: canvasW,
                    canvasH: canvasH,
                    imageData: imageData
                });
            }
            this.ready = true;
        },
        play: function() {
            playing = true;
            requestId = requestAnimationFrame(draw);

        },
        pause: function() {
            // console.log("pause");
            playing = false;
            cancelAnimationFrame(requestId);
        }
    });

})();

         
    window.VideoSlideView = VideoSlideView;
});
