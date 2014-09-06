define(['var/querySelector', 'views/WebGLIframeSlideView'], function() {
    var AaronTropeSlideView = new WebGLIframeSlideView({
        el: $("#aaron-trope"),
        src: "http://www.aaronkoblin.com/Aaronetrope/"
    });

    window.AaronTropeSlideView = AaronTropeSlideView;
});
