 /* jshint strict: false */
define(['var/querySelector',
'views/StartView',
'views/SlideView',
'views/IframeSlideView',
'views/slides/HelloKASlideView',
'views/slides/KeylightSlideView',
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
            // Sound Visualization
            KeylightSlideView,
            // Chrome Racer
            new SlideView({
                el: slides[6],
            }),
            // Video Introduction
            VideoSlideView,
            // Aaron Trope
            AaronTropeSlideView,
            // Graphics
             new SlideView({
                el: slides[9],
            }),
            // Hello Racer
            HelloRacerSlideView,
            // Visualizing Algorithms
            new SlideView({
                el: slides[11],
            }),
            // Enable
            new SlideView({
                el: slides[12],
            }),
            // Anthony Su
            new SlideView({
                el: slides[13],
            }),
            // I'm Ready
            ReadySlideView
        ]);
        StartView.init(function() {
            slideDeck.play(0);
        });
        window.slideDeck = slideDeck;

});
