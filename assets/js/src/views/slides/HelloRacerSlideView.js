define(['var/querySelector', 'views/WebGLIframeSlideView'], function() {
    var HelloRacerSlideView = new WebGLIframeSlideView({
        el: $("#hello-racer"),
        src: "http://helloracer.com/webgl/"
    });
});
