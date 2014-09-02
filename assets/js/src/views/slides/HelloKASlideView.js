define(['var/querySelector', 'views/AnimSlideView'], function() {
    var HelloKASlideView = new AnimSlideView({
        el: $("#hello-ka"),
    });

    window.HelloKASlideView = HelloKASlideView;
});
