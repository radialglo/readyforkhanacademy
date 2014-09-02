 /* jshint strict: false */
define(['var/querySelector','views/StartView', 'views/SlideView', 'views/IframeSlideView', 'views/VideoSlideView', 
'views/slides/KeylightSlideView',
'views/slides/AaronTropeSlideView',
'views/slides/HelloRacerSlideView',
'views/SlidedeckView'],
function() {
    var slides = $$(".slide");
    new SlidedeckView($("#world"), [
        // Hello Khan Academy
        new SlideView({
            el: slides[0],
        }),
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
        new SlideView({
            el: slides[7],
        }),
        // Aaron Trope
        AaronTropeSlideView,
        // Hello Racer
        HelloRacerSlideView,
        // Visualizing Algorithms
        new SlideView({
            el: slides[10],
        }),
        // Enable
        new SlideView({
            el: slides[11],
        }),
        // Anthony Su
        new SlideView({
            el: slides[12],
        }),
        // I'm Ready
        new SlideView({
            el: slides[13],
        })
    ]);
});
