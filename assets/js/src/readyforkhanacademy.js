 /* jshint strict: false */
define(['var/addWheelListener','var/rfa'], function() {
    
var frames = Array.prototype.slice.call(document.querySelectorAll("#world > div")),
    lastFrameIndex = frames.length - 1,
    wheelDelta = 0,
    perspective = 3000, // corresponds to value for webkit perspective
    vanishingPoint = 19000,
    focusPoint = -1500,
    dampConstant = 1, // 0.2
    ticking = false, 
    transformProp = Modernizr.prefixed('transform'),
    
    perspectiveOffset = 500, // 1500
    isMouseWheel = false,
    curIdx = 0,
    KEY_LEFT = 37,
    KEY_RIGHT = 39;


var hammerTime = new Hammer.Manager(document.querySelector("#world"), {
    recognizers: [
        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
        [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
    ]
});

function _renderSlide() {


    frames.forEach(function(f, i){
        f.classList.add("animateTransform");
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

hammerTime.on("swipeleft", nextSlide);
hammerTime.on("swiperight", previousSlide);

window.addEventListener("keyup", function(e) {
  
    var keyCode = e.keyCode;
    if (keyCode === KEY_LEFT) {

        previousSlide();
        
    } else if (keyCode === KEY_RIGHT) {
       
        nextSlide();
    }
    
});


    // 24000 1500
addWheelListener(window, function(e) {
    wheelDelta += e.deltaY * dampConstant;
    // console.log("requesting Tick");
    isMouseWheel = true;
    requestTick();
});

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
    z = Math.abs(z) - focusPoint;
    // the further we're away the more transparent the slide gets
    return (z < vanishingPoint) ? 1 - (z / vanishingPoint): 0;
    

}

function update() {

    var translateZ,
        rotateY;

    if (isMouseWheel) {
        frames.forEach(function(f, i){
            f.classList.remove("animateTransform");
        });   
    }


    frames.forEach(function(f, i) {

        translateZ =  (focusPoint + (-perspective * i) + wheelDelta);
       
        // add some additional offset if slide should be offScreen
        if (i < curIdx) {
            translateZ += perspectiveOffset;
        }
        
        if (isMouseWheel && translateZ > focusPoint && translateZ <  perspective) {
            curIdx = i;
        }

        rotateY = calculateRotation(translateZ);

        // add rotation if needed for mouse/swipe events
        if (translateZ > perspective) {
            rotateY = 90;
        }

        f.style.opacity = calculateOpacity(translateZ);
        f.style[transformProp] = "translate3d(0px , 0px," + translateZ  + "px) rotateY(" + rotateY + "deg)";
         // f.style[transformProp] = "rotateY(" + rotateY + "deg) translate3d(" + (xIncrement) + "px ," + translateY + "px," + translateZ  + "px)";
    });

    if (isMouseWheel) {
        isMouseWheel = false;
    }
    
    ticking = false;
}

if (Modernizr.csstransforms3d) {
    requestTick();
}

});
