define(['var/querySelector'], function(){
    var transformProp = Modernizr.prefixed('transform');

    /**
     * @class SlideView
     * @desc View for slides with static content
     */
    var SlideView = function(opts) {
        this.el = opts.el;
    };

    /**
     * @method update
     * @desc updates slide position
     */
    SlideView.prototype.update = function (data) {
        var style = this.el.style;
        style.opacity =  data.opacity;
        style[transformProp] = "translate3d(0px , 0px," + data.translateZ  + "px) rotateY(" + data.rotateY + "deg)";
        style.display = "";
    };

    SlideView.prototype.hide = function() {
        this.el.style.display = "none";
    };

    /**
     * @method enableAnimation
     * adds class that enables smooth transitioning via CSS
     */
    SlideView.prototype.enableAnimation = function () {
        this.el.classList.add("animateTransform");
    };

    /**
     * @method disableAnimation
     * removes class that enables smooth transitioning
     */
    SlideView.prototype.disableAnimation = function() {
        this.el.classList.remove("animateTransform");
    };
});
