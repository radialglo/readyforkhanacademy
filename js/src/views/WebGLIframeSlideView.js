define(['var/querySelector', 'var/browserDetect', 'views/IframeSlideView.js'], function(){

    /**
     * @class WebGLIframeSlideView
     * @extends IframeSlideView
     * @desc IframeSlideView for managing WebGL iframes
     */
    var WebGLIframeSlideView = function(opts) {

        IframeSlideView.apply(this, arguments);
    };

    WebGLIframeSlideView.prototype = Object.create(IframeSlideView.prototype);
    WebGLIframeSlideView.prototype.constructor = WebGLIframeSlideView;

    /**
     * @method load
     * @desc loads iframe source
     */
    WebGLIframeSlideView.prototype.load = function() {
        if (supportWebGL) {
            IframeSlideView.prototype.load.apply(this, arguments);
        }
    };

});

