 /* jshint strict: false */
define(['var/addWheelListener','var/rfa'], function() {

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
        nextFrame = frames[curIdx + 1],
        KEY_LEFT = 37,
        KEY_RIGHT = 39;

    var hammerTime = new Hammer.Manager(el, {
        recognizers: [
            // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
            [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
        ]
    });

    function _renderSlide() {

        currentFrame = frames[curIdx];
        prevFrame = frames[curIdx - 1];
        nextFrame = frames[curIdx + 1];
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
                currentFrame = frames[curIdx];
                prevFrame = frames[curIdx - 1];
                nextFrame = frames[curIdx + 1];
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

        
        if (currentFrame && currentFrame.play) {

            if (isMouseWheel) {
                if (!currentFrame.played) {
                    currentFrame.play();
                }
            } else {
      
                currentFrame.el.addEventListener(transEndEvent, playAfterTransition);
            }
        }

        if (currentFrame && currentFrame.load) {
            currentFrame.load();
        }

        // browser bug in Chrome where
        // loading Youtube Iirame with lowered opacity
        // messes up zIndex layering
        // fixed by setting to full opacity
        if (nextFrame && nextFrame.el.id === "networking") {
            nextFrame.el.style.opacity = "1.0";
        }

        if (nextFrame && nextFrame.destroy) {
            nextFrame.destroy();
        }

        /*
            TODO consider refreshing previous frame instead
            of deleting it
            
            if (prevFrame && prevFrame.load) {
                prevFrame.load();
            }
         */
        if (prevFrame && prevFrame.destroy) {
            prevFrame.destroy();
        }

        /*
        console.log(nextFrame.el.id);
        if (nextFrame && nextFrame.load) {
            console.log(nextFrame.id);
            nextFrame.load();
        }*/

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


});
