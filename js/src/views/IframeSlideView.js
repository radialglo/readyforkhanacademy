define(['var/querySelector','views/SlideView.js'], function(){

    /**
     * @class IframeSlideView
     * @extends SlideView
     * @desc SlideView for managing content heavy iframes
     */
    var IframeSlideView = function(opts) {

        SlideView.apply(this, arguments);
        var iframe = document.createElement("iframe");
        iframe.src = "about:blank";
        /*
        consider adding a load event
        iframe.onload = function() {
        };
        */
        var self = this;
            // TODO make iframe transitions smooth
        iframe.onload = function() {
            self.iframe.style.visibility = "visible";
        };
        this.iframe = iframe;
        this.src = opts.src;
        this.loaded = false;
        this.container = this.el.querySelector(".content--iframe");

        this.container.appendChild(iframe);
    };

    IframeSlideView.prototype = Object.create(SlideView.prototype);
    IframeSlideView.prototype.constructor = IframeSlideView;

    /**
     * @method load
     * @desc loads iframe source
     */
    IframeSlideView.prototype.load = function() {
        if (!this.loaded) {
            this.iframe.src = this.src;
            this.loaded = true;
            this.iframe.style.visibility = "hidden";
        }
    };

    /**
     * @method destroy
     * @desc clears iframe by adding blank page
     */
    IframeSlideView.prototype.destroy = function() {
        if (this.loaded) {
            this.iframe.src = "about:blank";
            this.loaded = false;
        }
    };

});
