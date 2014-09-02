define(['var/querySelector', 'views/IframeSlideView'], function() {
    var HelloRacerSlideView = new IframeSlideView({
        el: $("#graphics"),
        src: "http://helloracer.com/webgl/"
    });
});
