 /* jshint strict: false */
define(['var/querySelector',
'views/StartView',
'views/SlideView',
'views/IframeSlideView',
'views/WebGLIframeSlideView',
'views/slides/HelloKASlideView',
'views/slides/KeylightSlideView',
'views/slides/NetworkingSlideView',
'views/slides/VideoSlideView',
'views/slides/AaronTropeSlideView',
'views/slides/HelloRacerSlideView',
'views/slides/ReadySlideView',
'views/SlidedeckView'],
function() {
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
            // Audio
            new SlideView({
                el: slides[5],
            }),
            // Sound Visualization
            KeylightSlideView,
            // Networking
            NetworkingSlideView,
            // Chrome Racer
            new SlideView({
                el: slides[8],
            }),
            // Video Introduction
            VideoSlideView,
            // Aaron Trope
            AaronTropeSlideView,
            // Graphics
             new SlideView({
                el: slides[11],
            }),
            // Hello Racer
            HelloRacerSlideView,
            // Visualizing Algorithms
            new SlideView({
                el: slides[13],
            }),
            // Enable
            new SlideView({
                el: slides[14],
            }),
            // Anthony Su
            new SlideView({
                el: slides[15],
            }),
            // I'm Ready
            ReadySlideView,
            // Credits
            new SlideView({
                el: slides[17],
            })
        ]);
        StartView.init(function() {
            slideDeck.play(0);
        });
        
        if (window.console) {
            console.log(document.childNodes[1].nodeValue);
        }

});
