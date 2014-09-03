define(['var/querySelector','views/AnimSlideView.js'], function(){

    /**
     * @class PersistentAnimSlideView
     * @extends AnimSlideView
     * @desc SlideView for animations that loop or have infinite frames
     */
    var PersistentAnimSlideView = function(opts) {

        AnimSlideView.apply(this, arguments);
        if (opts.setup) {
            this.setup = setup;
        }

        if (opts.pause) {
            this.pause = pause;
        }

    };

    PersistentAnimSlideView.prototype = Object.create(AnimSlideView.prototype);
    PersistentAnimSlideView.prototype.constructor = PersistentAnimSlideView;

    /**
     * @method setup
     * @desc performs preprocessing or any other work before animation
     */
    PersistentAnimSlideView.prototype.setup = function() {
    };

    /**
     * @method play
     * @desc plays animation
     */
    PersistentAnimSlideView.prototype.play = function() {
    };

    /**
     * @method pause
     * @desc pause  animation
     */
    PersistentAnimSlideView.prototype.pause = function() {
    };

});
