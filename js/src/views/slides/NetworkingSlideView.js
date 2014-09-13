define(['var/querySelector', 'views/AnimSlideView'], function() {
    var NetworkingSlideView,
    renderTrace = function(path) {
    /**
     *  @see http://jakearchibald.com/2013/animated-line-drawing-svg/
     */

        var length = path.getTotalLength();
        
        path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 1.5s ease-in-out';
        // Go!
        path.style.strokeDashoffset = '0';
    },
    hideStroke= function(path) {
        var length = path.getTotalLength();
        // Clear any previous transition
        path.style.transition = path.style.WebkitTransition =
        'none';
        // Set up the starting positions
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
    };

    (function() {

        var paths;

         NetworkingSlideView = new AnimSlideView({
            el: $("#networking"),
            setup: function() {
              if (!this.ready) {
                paths = Array.prototype.slice.call(this.el.querySelectorAll("path"));
                paths.forEach(function(p) {
                    hideStroke(p);
                });
                this.ready = true;
                this.played = false;
              }
            },
            play: function() {
                this.ready = false;
                if (!this.played) {
                    paths.forEach(function(p){
                        renderTrace(p);
                    });
                    this.played = true;
                } else {
                    this.replay();
                }
            },
            replay: function() {
                this.setup();
                this.el.getBoundingClientRect();
                this.play();
            }
        });


    })();

});
