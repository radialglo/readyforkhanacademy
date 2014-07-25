/*!
 * /? [- /\ |) `/   /= () /?   /< |-| /\ |\| /\ ( /\ |) [- |\/| `/
 *
 * v0.1.0
 * Date: 2014-06-25
 */
(function(window, undefined) {

    "use strict";

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



    
var frames = Array.prototype.slice.call(document.querySelectorAll("#world > div")),
    yTranslation = 0,
    yIncrement = 0, // 50
    xIncrement = 0,
    wheelDelta = 0,
    perspective = 3000, // corresponds to value for webkit perspective
    vanishingPoint = 19000,
    focusPoint = 1500,
    dampConstant = 0.5, // 0.2
    perspectiveOffset = 1000,
    ticking = false;
    // 24000 1500
window.addEventListener("mousewheel", function(e) {
    // console.log(e);
    wheelDelta += e.wheelDelta * dampConstant;
    console.log("requesting Tick");
    requestTick();
});

function requestTick() {
    if(!ticking) {
        requestAnimationFrame(update);
        ticking = true;
    }
}

function update() {
    frames.forEach(function(f, i) {
        var translateZ = (perspectiveOffset + (-perspective * (i + 1)) + wheelDelta),
            translateY = (yTranslation - (yIncrement * i)),
            rotateY = 0,
            absZ = Math.abs(translateZ) - 1500;
            if (translateZ > -focusPoint && translateZ <  perspective) {
            // before a slide moves completely out of view (perspective == translateZ),
            // add rotations
                rotateY = ((translateZ + focusPoint) / perspective) * 90;
            }

            // the further we're away the more transparent the slide gets
            if (absZ < vanishingPoint) {
                f.style.opacity = 1 - (absZ / vanishingPoint);
            } else {
                f.style.opacity = 0;
            }
                
        f.style.webkitTransform = "translate3d(" + (xIncrement) + "px ," + translateY + "px," + translateZ  + "px) rotateY(" + rotateY + "deg)";
    
    });
    ticking = false;
}

requestAnimationFrame(update);


})(this);
