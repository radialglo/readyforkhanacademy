define(['var/querySelector'], function() {

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

});
