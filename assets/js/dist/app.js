/*!
 * /? [- /\ |) `/   /= () /?   /< |-| /\ |\| /\ ( /\ |) [- |\/| `/
 *
 * v0.1.0
 * Date: 2014-09-03
 */
(function(window, undefined) {

    "use strict";


var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);




var StartView = (function() {

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

    return { 
        init: function(onComplete) {
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
                            if (onComplete) {
                                onComplete();
                            }
                            startScreen = null;
                            leaf = null;
                            leafTrace = null;
                            leafLeftTrace = null;
                            leafRightTrace = null;
                            topPanel = null;
                            bottomPanel = null;
                            renderTrace = null;
                        }, 600);
                    }, 600);
                }, 500);
            }, 1500);
        }
    };
})();



    var transformProp = Modernizr.prefixed('transform');

    /**
     * @class SlideView
     * @desc View for slides with static content
     */
    var SlideView = function(opts) {
        this.el = opts.el;
    };

    /**
     * @method update
     * @desc updates slide position
     */
    SlideView.prototype.update = function (data) {
        var style = this.el.style;
        style.opacity =  data.opacity;
        style[transformProp] = "translate3d(0px , 0px," + data.translateZ  + "px) rotateY(" + data.rotateY + "deg)";
    };

    /**
     * @method enableAnimation
     * adds class that enables smooth transitioning via CSS
     */
    SlideView.prototype.enableAnimation = function () {
        this.el.classList.add("animateTransform");
    };

    /**
     * @method disableAnimation
     * removes class that enables smooth transitioning
     */
    SlideView.prototype.disableAnimation = function() {
        this.el.classList.remove("animateTransform");
    };



    /**
     * @class IframeSlideView
     * @extends SlideView
     * @desc SlideView for managing content heavy iframes
     */
    var IframeSlideView = function(opts) {

        SlideView.apply(this, arguments);
        var iframe = document.createElement("iframe");
        iframe.src = "about:blank";
        /*
        consider adding a load event
        iframe.onload = function() {
        };
        */
        var self = this;
            // TODO make iframe transitions smooth
        iframe.onload = function() {
            self.iframe.style.visibility = "visible";
        };
        this.iframe = iframe;
        this.src = opts.src;
        this.loaded = false;
        this.container = this.el.querySelector(".content--iframe");

        this.container.appendChild(iframe);
    };

    IframeSlideView.prototype = Object.create(SlideView.prototype);
    IframeSlideView.prototype.constructor = IframeSlideView;

    /**
     * @method load
     * @desc loads iframe source
     */
    IframeSlideView.prototype.load = function() {
        if (!this.loaded) {
            this.iframe.src = this.src;
            this.loaded = true;
            this.iframe.style.visibility = "hidden";
        }
    };

    /**
     * @method destroy
     * @desc clears iframe by adding blank page
     */
    IframeSlideView.prototype.destroy = function() {
        if (this.loaded) {
            this.iframe.src = "about:blank";
            this.loaded = false;
        }
    };




    /**
     * @class AnimSlideView
     * @extends SlideView
     * @desc SlideView for animations
     */
    var AnimSlideView = function(opts) {

        SlideView.apply(this, arguments);
        // override current play function if needed
        if (opts.play) {
            this.play = opts.play;
        }
        this.played = false;

    };

    AnimSlideView.prototype = Object.create(SlideView.prototype);
    AnimSlideView.prototype.constructor = AnimSlideView;

    /**
     * @method play
     * @desc plays animation
     */
    AnimSlideView.prototype.play = function() {
        if (!this.played) {
            this.el.classList.add("render");
            this.played = true;
        }
    };



    var HelloKASlideView = new AnimSlideView({
        el: $("#hello-ka"),
    });

    window.HelloKASlideView = HelloKASlideView;


    var KeylightSlideView = new IframeSlideView({
        el: $("#sound-viz"),
        src: "http://hakim.se/experiments/html5/keylight/03"
    });



    /**
     * @class PersistentAnimSlideView
     * @extends AnimSlideView
     * @desc SlideView for animations that loop or have infinite frames
     */
    var PersistentAnimSlideView = function(opts) {

        AnimSlideView.apply(this, arguments);
        if (opts.setup) {
            this.setup = opts.setup;
        }

        if (opts.pause) {
            this.pause = opts.pause;
        }

    };

    PersistentAnimSlideView.prototype = Object.create(AnimSlideView.prototype);
    PersistentAnimSlideView.prototype.constructor = PersistentAnimSlideView;

    /**
     * @method setup
     * @desc performs preprocessing or any other work before animation
     */
    PersistentAnimSlideView.prototype.setup = function() {
    };

    /**
     * @method play
     * @desc plays animation
     */
    PersistentAnimSlideView.prototype.play = function() {
    };

    /**
     * @method pause
     * @desc pause  animation
     */
    PersistentAnimSlideView.prototype.pause = function() {
    };



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
    drawing = false,
    particles;

 
var draw = function() {
    if (drawing) {
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
            drawing = true;
            requestId = requestAnimationFrame(draw);

        },
        pause: function() {
            console.log("pause");
            drawing = false;
            cancelAnimationFrame(requestId);
        }
    });

})();

         
    window.VideoSlideView = VideoSlideView;


    var AaronTropeSlideView = new IframeSlideView({
        el: $("#aaron-trope"),
        src: "http://www.aaronkoblin.com/Aaronetrope/"
    });

    window.AaronTropeSlideView = AaronTropeSlideView;


    var HelloRacerSlideView = new IframeSlideView({
        el: $("#graphics"),
        src: "http://helloracer.com/webgl/"
    });


    var ReadySlideView = new AnimSlideView({
        el: $("#ready"),
        play: function() {
            var tree = $("#khan-tree");
             // first trigger a reflow
            // tree.getBoundingClientRect();
            tree.classList.add("render");
        }
    });

    window.ReadySlideView = ReadySlideView;

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


var transEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
    'MozTransition'    : 'transitionend',      // only for FF < 15
    'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
},
transEndEvent = transEndEventNames[ Modernizr.prefixed('transition') ];



var SlidedeckView = function(el, slides) {
 
    var frames = slides,
        lastFrameIndex = frames.length - 1,
        wheelDelta = 0,
        perspective = 3000, // corresponds to value for webkit perspective
        vanishingPoint = 19000,
        focusPoint = -1500,
        dampConstant = 1, // 0.2
        ticking = false, 
        
        perspectiveOffset = 500, // 1500
        isMouseWheel = false,
        curIdx = 0,
        currentFrame = frames[curIdx],
        prevFrame = frames[curIdx - 1],
        nextTwoFrame = frames[curIdx - 2],
        nextFrame = frames[curIdx + 1],
        KEY_LEFT = 37,
        KEY_RIGHT = 39;

    var hammerTime = new Hammer.Manager(el, {
        recognizers: [
            // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
            [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
        ]
    });

    function _updateSlideReferences() {
        currentFrame = frames[curIdx];
        prevFrame = frames[curIdx - 1];
        nextFrame = frames[curIdx + 1];
        nextTwoFrame = frames[curIdx + 2];
    }

    function _renderSlide() {

        currentFrame = frames[curIdx];
        _updateSlideReferences();
        frames.forEach(function(f, i){
            f.enableAnimation();
        });
        wheelDelta = curIdx > 0 ? perspective * curIdx : 0;
        requestTick();
    }

    function nextSlide() {


        if (curIdx < lastFrameIndex) {
            curIdx += 1;
            _renderSlide();
        }
       
    }

    function previousSlide() {

        if (curIdx >= 1) {
            curIdx -= 1;
            _renderSlide();
        }
        
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

    /**
     * @function playAfterTransition
     * @desc plays slide after transition ends, i.e. slide stops moving
     */
    function playAfterTransition(){
        // console.log("transitionend");
        // console.log(currentFrame);
        currentFrame.play();
        currentFrame.el.removeEventListener(transEndEvent, playAfterTransition);
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
                _updateSlideReferences();
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

        
        if (currentFrame) {

            if (currentFrame.play) {
                if (isMouseWheel) {
                    if (!currentFrame.played) {
                        currentFrame.play();
                    }
                } else {
          
                    currentFrame.el.addEventListener(transEndEvent, playAfterTransition);
                }

            }

            if (currentFrame.load) {
              currentFrame.load();  
            }
        }

        if (nextFrame) {
            // browser bug in Chrome where
            // loading Youtube Iframe or Canvas with lowered opacity
            // messes up zIndex layering
            // fixed by setting to full opacity
            if (nextFrame.el.id === "networking" || nextFrame.el.id === "video") {
                nextFrame.el.style.opacity = "1.0";
            }

            if (nextFrame.destroy) {
                nextFrame.destroy();
            }

            if (nextFrame.pause) {
                nextFrame.pause();
            }
               /*
                console.log(nextFrame.el.id);
                if (nextFrame && nextFrame.load) {
                    console.log(nextFrame.id);
                    nextFrame.load();
                }*/
        }

        if (nextTwoFrame) {
            if (nextTwoFrame.setup) {
                nextTwoFrame.setup();
            }
        }

        /*
            TODO consider refreshing previous frame instead
            of deleting it
            
            if (prevFrame && prevFrame.load) {
                prevFrame.load();
            }
         */
        if (prevFrame) {
            if  (prevFrame.destroy) {
                prevFrame.destroy();
            }
            if (prevFrame.pause) {
                prevFrame.pause();
            }
        }

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

    this.getFrames = function() {
        return frames;
    };
    this.play =  function(idx) {
        var frame = frames[idx];
        if (frame && frame.play) {
            frame.play();
        }
    };

};



 /* jshint strict: false */

    var slides = $$(".slide"),
        slideDeck = new SlidedeckView($("#world"), [
            // Hello Khan Academy
            HelloKASlideView,
            // What
            new SlideView({
                el: slides[1],
            }),
            // Specifics
            new SlideView({
                el: slides[2],
            }),
            // Research
            new SlideView({
                el: slides[3],
            }),
            // HTML5 Expansions
            new SlideView({
                el: slides[4],
            }),
            // Sound Visualization
            KeylightSlideView,
            // Chrome Racer
            new SlideView({
                el: slides[6],
            }),
            // Video Introduction
            VideoSlideView,
            // Aaron Trope
            AaronTropeSlideView,
            // Hello Racer
            HelloRacerSlideView,
            // Visualizing Algorithms
            new SlideView({
                el: slides[10],
            }),
            // Enable
            new SlideView({
                el: slides[11],
            }),
            // Anthony Su
            new SlideView({
                el: slides[12],
            }),
            // I'm Ready
            ReadySlideView
        ]);
        StartView.init(function() {
            slideDeck.play(0);
        });
        window.slideDeck = slideDeck;


})(this);
