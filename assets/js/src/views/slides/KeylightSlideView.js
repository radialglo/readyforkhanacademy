define(['var/querySelector', 'views/IframeSlideView'], function() {
    var KeylightSlideView = new IframeSlideView({
        el: $("#sound-viz"),
        src: "http://hakim.se/experiments/html5/keylight/03"
    });
});
