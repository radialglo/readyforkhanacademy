define(['var/querySelector', 'views/IframeSlideView'], function() {
    var AaronTropeSlideView = new IframeSlideView({
        el: $("#aaron-trope"),
        src: "http://www.aaronkoblin.com/Aaronetrope/"
    });

    window.AaronTropeSlideView = AaronTropeSlideView;
});
