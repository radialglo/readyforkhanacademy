 /* jshint strict: false */
define(['var/addWheelEventListener','var/rfa'], function() {
    
var frames = Array.prototype.slice.call(document.querySelectorAll("#world > div")),
    yTranslation = 0,
    yIncrement = 0, // 50
    xIncrement = 0,
    wheelDelta = 0,
    perspective = 3000, // corresponds to value for webkit perspective
    vanishingPoint = 19000,
    focusPoint = 1500,
    dampConstant = 1, // 0.2
    perspectiveOffset = 1500, // 1000
    ticking = false,
    translateZIncrement =  perspective,
    transformProp = Modernizr.prefixed('transform'),
    // cache to store transformation values so that we don't need to
    // read from DOM
    transformData = [];

    frames.forEach(function(){
        transformData.push({
            rotateY: 0,
            translateZ: 0
        });
    });

var hammerTime = new Hammer.Manager(document.querySelector("#world"), {
    recognizers: [
        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
        [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
    ]
});

hammerTime.on("swipeleft", function(e) {

    console.log("swipeleft");
    frames.forEach(function(f, i){
        f.classList.add("animateTransform");
    });
    frames.forEach(function(f, i){
        var data = transformData[i],
            // TODO determine good offset
            translateZ = data.translateZ + translateZIncrement,
            rotateY = calculateOpacity(Math.abs(translateZ));

            f.style[transformProp] = "translate3d(0px , 0px," + translateZ  + "px) rotateY(" + rotateY + "deg)";

            data.translateZ = translateZ;
            data.rotateY = rotateY;
       
    });
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
    return (translateZ > -focusPoint && translateZ <  perspective) ? ((translateZ + focusPoint) / perspective) * 90 : 0;
    
}

function calculateOpacity(z) {

    // normallize z relative to focus point
    z = z - focusPoint;
    // the further we're away the more transparent the slide gets
    return (z < vanishingPoint) ? 1 - (z / vanishingPoint): 0;
    

}

function update() {
    frames.forEach(function(f, i) {
        var translateZ = (perspectiveOffset + (-perspective * (i + 1)) + wheelDelta),
            translateY = (yTranslation - (yIncrement * i)),
            rotateY = calculateRotation(translateZ),
            absZ = Math.abs(translateZ),
            data = transformData[i];           

        data.rotateY = rotateY;
        data.translateZ = translateZ;

        f.style.opacity = calculateOpacity(absZ);
        f.style[transformProp] = "translate3d(" + (xIncrement) + "px ," + translateY + "px," + translateZ  + "px) rotateY(" + rotateY + "deg)";
         // f.style[transformProp] = "rotateY(" + rotateY + "deg) translate3d(" + (xIncrement) + "px ," + translateY + "px," + translateZ  + "px)";
    });
    console.log(transformData);
    ticking = false;
}

if (Modernizr.csstransforms3d) {
    requestAnimationFrame(update);
}

});
