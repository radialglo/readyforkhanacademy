define([], function() {
var frames = Array.prototype.slice.call(document.querySelectorAll("#world > div")),
    yTranslation = 0,
    yIncrement = 0, // 50
    xIncrement = 0,
    wheelDelta = 0,
    perspective = 3000, // corresponds to value for webkit perspective
    vanishingPoint = 19000,
    focusPoint = 1500,
    dampConstant = 0.5, // 0.2
    perspectiveOffset = 1000;
    // 24000 1500
window.addEventListener("mousewheel", function(e) {
    // console.log(e);
    wheelDelta += e.wheelDelta * dampConstant;
    update();
});

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
}
update();

});
