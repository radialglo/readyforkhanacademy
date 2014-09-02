define(['var/querySelector','views/SlideView.js'], function(){

    var IframeSlideView = function(opts) {

        SlideView.apply(this, arguments);
        var iframe = document.createElement("iframe");
        
        iframe.src = "about:blank";
        /*
        consider adding a load event
        iframe.onload = function() {
        };
        */
        this.iframe = iframe;
        this.src = opts.src;
        this.container = this.el.querySelector(".content--iframe");

        this.container.appendChild(iframe);
    };

    IframeSlideView.prototype = Object.create(SlideView.prototype);
    IframeSlideView.prototype.constructor = IframeSlideView;

    IframeSlideView.prototype.load = function() {
        this.iframe.src = this.src;
    };

    IframeSlideView.prototype.destroy = function() {
        this.iframe.src = "about:blank";
    };

});
