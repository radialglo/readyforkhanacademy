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


    var translateZ,
        rotateY;

    frames.forEach(function(f, i){
        f.classList.add("animateTransform");
    });
    frames.forEach(function(f, i){

        translateZ =  (curIdx - i) * perspective;
        if (i >= curIdx) {

            translateZ +=  focusPoint;

            // update wheel delta so that user can also scroll
            if (i === curIdx) {
                wheelDelta = perspective * curIdx;
            }
        }


        rotateY = calculateRotation(translateZ);

        f.style.opacity = calculateOpacity(translateZ);
        f.style[transformProp] = "translate3d(0px , 0px," + translateZ  + "px) rotateY(" + rotateY + "deg)";
  
    });
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

    // normallize z relative to focus point
    z = Math.abs(z) - focusPoint;
    // the further we're away the more transparent the slide gets
    return (z < vanishingPoint) ? 1 - (z / vanishingPoint): 0;
    

}

function update() {
    frames.forEach(function(f, i) {
        var translateZ = (focusPoint + (-perspective * i) + wheelDelta),
            rotateY = calculateRotation(translateZ);

        if (translateZ > focusPoint && translateZ <  perspective) {
            curIdx = i;
        }

        f.style.opacity = calculateOpacity(translateZ);
        f.style[transformProp] = "translate3d(0px , 0px," + translateZ  + "px) rotateY(" + rotateY + "deg)";
         // f.style[transformProp] = "rotateY(" + rotateY + "deg) translate3d(" + (xIncrement) + "px ," + translateY + "px," + translateZ  + "px)";
    });
    
    ticking = false;
}

if (Modernizr.csstransforms3d) {
    requestAnimationFrame(update);
}

});
