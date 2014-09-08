 /* jshint strict: false */
define(['var/browserDetect','var/addWheelListener','var/rfa'], function() {

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
        nextTwoFrame = frames[curIdx + 2],
        nextFrame = frames[curIdx + 1],
        // arrow keys
        KEY_LEFT = 37,
        KEY_RIGHT = 39,
        KEY_UP = 38,
        KEY_DOWN = 40;

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
        if (keyCode === KEY_LEFT || keyCode === KEY_DOWN) {

            previousSlide();
            
        } else if (keyCode === KEY_RIGHT || keyCode === KEY_UP) {
           
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

    /**
     * @function update
     * @desc updates slide deck within animation frame
     */
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

            // make sure we don't rotate past 90
            if (rotateY > 90) {
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
            if (nextFrame.el.id === "networking" || nextFrame.el.id === "video" || nextFrame.el.id === "graphics") {
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
                }
            */
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

    if (isMobile || isSmallScreen) {
        // current experience does not perform scrolling jacking for
        // mobile experiences
        // treat slide deck as if it were static
        frames.forEach(function(f,i){
            if (f instanceof AnimSlideView && !(f instanceof PersistentAnimSlideView) && f.play) {
                f.play();
            }
        });

    } else {

        if (Modernizr.csstransforms3d) {
            requestTick();

            // init event listeners
            hammerTime.on("swipeleft", nextSlide);
            hammerTime.on("swiperight", previousSlide);
            window.addEventListener("keyup", handleKeys);
            addWheelListener(window, handleMouseWheel);
        }
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
