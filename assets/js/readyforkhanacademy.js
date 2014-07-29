/*!
 * /? [- /\ |) `/   /= () /?   /< |-| /\ |\| /\ ( /\ |) [- |\/| `/
 *
 * v0.1.0
 * Date: 2014-06-28
 */
(function(window, undefined) {

    "use strict";
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



    
var frames = Array.prototype.slice.call(document.querySelectorAll("#world > div")),
    yTranslation = 0,
    yIncrement = 0, // 50
    xIncrement = 0,
    wheelDelta = 0,
    perspective = 3000, // corresponds to value for webkit perspective
    vanishingPoint = 19000,
    focusPoint = 1500,
    dampConstant = 1, // 0.2
    perspectiveOffset = 1000,
    ticking = false,
    transformProp = Modernizr.prefixed('transform');
    
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
                
        f.style[transformProp] = "translate3d(" + (xIncrement) + "px ," + translateY + "px," + translateZ  + "px) rotateY(" + rotateY + "deg)";
    
    });
    ticking = false;
}

requestAnimationFrame(update);


})(this);
