define(['var/querySelector', 'views/IframeSlideView'], function() {
    var HelloRacerSlideView = new IframeSlideView({
        el: $("#hello-racer"),
        src: "http://helloracer.com/webgl/"
    });
});
