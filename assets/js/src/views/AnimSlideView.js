define(['var/querySelector','views/SlideView.js'], function(){

    /**
     * @class AnimSlideView
     * @extends SlideView
     * @desc SlideView for animations
     */
    var AnimSlideView = function(opts) {

        SlideView.apply(this, arguments);
        // override current play function if needed
        if (opts.play) {
            this.play = opts.play;
        } 

        if (opts.replay) {
            this.replay = opts.replay;
        }
        this.played = false;

    };

    AnimSlideView.prototype = Object.create(SlideView.prototype);
    AnimSlideView.prototype.constructor = AnimSlideView;

    /**
     * @method play
     * @desc plays animation
     */
    AnimSlideView.prototype.play = function() {
        if (!this.played) {
            this.el.classList.add("render");
            this.played = true;
        } 
    };

    /**
     * @method replay
     * @desc replays animation
     */

    AnimSlideView.prototype.replay = function() {
        this.el.classList.remove("render");
        // trigger a reflow
        this.el.getBoundingClientRect();
        this.el.classList.add("render");
    };

});
