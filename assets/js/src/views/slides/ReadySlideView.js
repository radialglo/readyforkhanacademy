define(['var/querySelector', 'views/AnimSlideView'], function() {
    var ReadySlideView = new AnimSlideView({
        el: $("#ready"),
        play: function() {
            var tree = $("#khan-tree")
             // first trigger a reflow
            // tree.getBoundingClientRect();
            tree.classList.add("render");
        }
    });

    window.ReadySlideView = ReadySlideView;
});
