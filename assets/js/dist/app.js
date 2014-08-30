/*!
 * /? [- /\ |) `/   /= () /?   /< |-| /\ |\| /\ ( /\ |) [- |\/| `/
 *
 * v0.1.0
 * Date: 2014-07-30
 */
(function(window, undefined) {

    "use strict";


var $ = document.querySelector.bind(document),
	$$ = document.querySelectorAll.bind(document);



var startScreen = $("#start-screen"),
    leaf = $(".start-leaf"),
    leafTrace = $("#leaf-trace"),
    leafLeftTrace = $('#leaf-trace__left'),
    leafRightTrace = $('#leaf-trace__right'),
    topPanel = $(".start-screen__top"),
    bottomPanel = $(".start-screen__bottom"),
    renderTrace = function(path) {
    /**
     *  @see http://jakearchibald.com/2013/animated-line-drawing-svg/
     */

        var length = path.getTotalLength();
        // Clear any previous transition
        path.style.transition = path.style.WebkitTransition =
        'none';
        // Set up the starting positions
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.getBoundingClientRect();
        path.style.visibility = "visible";
        // Define our transition
        path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 1.5s ease-in-out';
        // Go!
        path.style.strokeDashoffset = '0';
    };

renderTrace(leafLeftTrace);
renderTrace(leafRightTrace);

// TODO: clean up nesting
setTimeout(function(){
    leafTrace.classList.add("hide");
    leaf.classList.add("show");
    setTimeout(function() {
        leaf.classList.add("scaleDown");
        setTimeout(function() {
            // may possibly need to make panels look seamless
            // $("#start-screen").style.background = "none";
            topPanel.classList.add("slideUp");
            bottomPanel.classList.add("slideDown");
            setTimeout(function() {
                // destroy start screen and clear references
                startScreen.parentNode.removeChild(startScreen);
                startScreen = null;
                leaf = null;
                leafTrace = null;
                leafLeftTrace = null;
                leafRightTrace = null;
                topPanel = null;
                bottomPanel = null;
            }, 500);
        }, 600);
    }, 500);
}, 1500);



	var transformProp = Modernizr.prefixed('transform');

	var SlideView = function(opts) {
		this.el = opts.el;
	};

	SlideView.prototype.update = function (data) {
		var style = this.el.style;
		style.opacity =  data.opacity;
        style[transformProp] = "translate3d(0px , 0px," + data.translateZ  + "px) rotateY(" + data.rotateY + "deg)";
	};

	SlideView.prototype.enableAnimation = function () {
		this.el.classList.add("animateTransform");
	};

	SlideView.prototype.disableAnimation = function() {
		this.el.classList.remove("animateTransform");
	};

// https://developer.mozilla.org/en-US/docs/Web/Events/wheel

// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
(function(window,document) {

    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            console.log("DOMMouseScroll");
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }

})(window,document);



// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


 /* jshint strict: false */


var SlidedeckView = function(el, slidesData) {
 
    var frames = [],
        lastFrameIndex = slidesData.length - 1,
        wheelDelta = 0,
        perspective = 3000, // corresponds to value for webkit perspective
        vanishingPoint = 19000,
        focusPoint = -1500,
        dampConstant = 1, // 0.2
        ticking = false, 
        
        perspectiveOffset = 500, // 1500
        isMouseWheel = false,
        curIdx = 0,
        KEY_LEFT = 37,
        KEY_RIGHT = 39;

    slidesData.forEach(function(slideOptions){
        frames.push(new SlideView(slideOptions));
    });


    var hammerTime = new Hammer.Manager(el, {
        recognizers: [
            // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
            [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
        ]
    });

    function _renderSlide() {


        frames.forEach(function(f, i){
            f.enableAnimation();
        });
        wheelDelta = curIdx > 0 ? perspective * curIdx : 0;
        requestTick();
    }

    function nextSlide() {


        if (curIdx < lastFrameIndex) {
            curIdx += 1;
        }

        _renderSlide();
       
    }

    function previousSlide() {

        if (curIdx >= 1) {
            curIdx -= 1;
        }

        _renderSlide();
        
    }


    function handleKeys(e) {
      
        var keyCode = e.keyCode;
        if (keyCode === KEY_LEFT) {

            previousSlide();
            
        } else if (keyCode === KEY_RIGHT) {
           
            nextSlide();
        }
        
    }

   

    function handleMouseWheel(e) {
        wheelDelta += e.deltaY * dampConstant;
        // console.log("requesting Tick");
        isMouseWheel = true;
        requestTick();
    }

    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    function calculateRotation(translateZ) {
        // before a slide moves completely out of view (perspective == translateZ),
        // add rotations
        return (translateZ >= focusPoint && translateZ <  perspective) ? ((translateZ - focusPoint) / perspective) * 90 : 0;
        
    }

    function calculateOpacity(z) {

        // normalize z relative to focus point
        z = Math.abs(z) + focusPoint;
        // the further we're away the more transparent the slide gets
        return (z < vanishingPoint) ? 1 - (z / vanishingPoint): 0;
        

    }

    function update() {

        var translateZ,
            rotateY;

        if (isMouseWheel) {
            frames.forEach(function(f, i){
                f.disableAnimation();
            });   
        }


        frames.forEach(function(f, i) {

            translateZ =  (focusPoint + (-perspective * i) + wheelDelta);

            if (isMouseWheel && translateZ > focusPoint && translateZ <  perspective) {
                curIdx = i;
            }
           
            // add some additional offset if slide should be offScreen
            if (i < curIdx) {
                translateZ += perspectiveOffset;
            }
            
            rotateY = calculateRotation(translateZ);

            // add rotation if needed for mouse/swipe events
            if (translateZ > perspective) {
                rotateY = 90;
            }

            f.update({
                opacity: calculateOpacity(translateZ),
                rotateY: rotateY,
                translateZ: translateZ
            });

        });

        if (isMouseWheel) {
            isMouseWheel = false;
        }
        
        ticking = false;
    }

    hammerTime.on("swipeleft", nextSlide);
    hammerTime.on("swiperight", previousSlide);
    window.addEventListener("keyup", handleKeys);
    addWheelListener(window, handleMouseWheel);

    if (Modernizr.csstransforms3d) {
        requestTick();
    }

};




  var canvas = $("#videoCanvas"),
            ctx = canvas.getContext("2d");

        var bgCanvas = document.createElement("canvas");
        var bgCtx = bgCanvas.getContext("2d"),
            canvasW = $("#video .content-wrapper").offsetWidth,
            canvasH = $("#video .content-wrapper").offsetHeight,
            keyword = "V I D E O",
            imageData,
            rowGap = 10,
            columnGap = 10;

         canvas.width = canvasW;
         canvas.height = canvasH;
         bgCanvas.width = canvasW;
         bgCanvas.height = canvasH;
         // rem works
         /*
         bgCtx.font = "200px 'Arial'";
         bgCtx.font= '"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Garuda,Verdana,Tahoma,sans-serif';
         */
         // bgCtx.font = "bold 200px Oswald ";
         bgCtx.font = "125px bold Oswald ";
         //Fill the keyword text onto the bgCanvas.
         var textMetrics = bgCtx.measureText(keyword);
         console.log(textMetrics);
         // draw text relative to its vertical middle
         bgCtx.textBaseline = "middle";
         bgCtx.fillText(keyword, ( canvasW / 2 ) - ( Math.round( textMetrics.width /2 ) ) , (canvasH / 2));
         imageData = bgCtx.getImageData(0, 0, canvasW, canvasH).data;
         // https://github.com/kennethcachia/Shape-Shifter/blob/master/scripts/shape-builder.js
         // data is a one dimensional array containing the data in the RGBA order, with integer values 0 and 255
         // we can check if the pixel was drawn if it has an alpha value greater than 0
         // console.log(imageData),
         
         /*
         var pixel,
            particles = [],
            colors = ["grey", "yellow", "teal", "lime", "magenta" , "red", "blue"],
            // colors = ["#4387fd", "#125758", "#01a2ff", "#0cf"],
            color;
         for (var height = 0; height < canvasH; height += rowGap) {
             // color = colors[Math.floor((Math.random() * 100))  % colors.length];
            color = colors[(height / rowGap)  % colors.length];
            for (var width = 0; width < canvasW; width += columnGap) {

                // get the alpha value
                var index = ((width + (height * canvasW)) * 4) - 1;
                pixel = imageData[index];
                console.log(index);
                console.log(pixel);
                if (pixel > 0) {
                    particles.push({
                        color: color,
                        x: width,
                        y: height
                    });
                }

            }
         }

        // document.body.appendChild(bgCanvas);

         console.log(particles);

         var draw = function() {

         // color = colors[Math.floor((Math.random() * 100))  % colors.length];

         var end = Math.floor(canvasW / columnGap / 5);

         // ctx.fillStyle = "black";
         ctx.clearRect(0, 0, canvasW, canvasH);
         // ctx.fillRect(0, 0, canvasW, canvasH)
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
            ctx.moveTo( x, y - height / 2 );

            ctx.lineTo(x + (2 + Math.random() * width), y - height / 2);
        

            ctx.closePath();
            ctx.stroke();
           
         }
            requestAnimationFrame(draw);
         }
         requestAnimationFrame(draw);
         */

 /* jshint strict: false */

    
    var slides = $$(".slide");
    new SlidedeckView($("#world"), [
    	{
    		el: slides[0],
    		render: null
    	},
    	{
    		el: slides[1],
    		render: null
    	},
    	{
    		el: slides[2],
    		render: null
    	},
    	{
    		el: slides[3],
    		render: null
    	},
    	{
    		el: slides[4],
    		render: null
    	},
    	{
    		el: slides[5],
    		render: null
    	},
    	{
    		el: slides[6],
    		render: null
    	},
    	{
    		el: slides[7],
    		render: null
    	},
    	{
    		el: slides[8],
    		render: null
    	},
    	{
    		el: slides[9],
    		render: null
    	},
        {
            el: slides[10],
            render: null
        },
        {
            el: slides[11],
            render: null
        },
        {
            el: slides[12],
            render: null
        },
        {
            el: slides[13],
            render: null
        }
    ]);

})(this);
