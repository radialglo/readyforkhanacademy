define(['var/querySelector', 'views/AnimSlideView'], function() {
    var ReadySlideView = new AnimSlideView({
        el: $("#ready"),
        play: function() {
            if (!this.played) {
                var tree = $("#khan-tree");
                 // first trigger a reflow
                // tree.getBoundingClientRect();
                tree.classList.add("render");
                this.played = true;
            } else {
                this.replay();
            }
        },
        replay: function() {
            var tree = $("#khan-tree");
                tree.classList.remove("render");
                // trigger a reflow
                tree.getBoundingClientRect();
                tree.classList.add("render");
        }
    });

    window.ReadySlideView = ReadySlideView;
});
