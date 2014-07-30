define([], function(){
	var transformProp = Modernizr.prefixed('transform');

	var SlideView = function(opts) {
		this.el = opts.el;
	};

	SlideView.prototype.update = function (data) {
		var style = this.el.style;
		style.opacity =  data.opacity;
        style[transformProp] = "translate3d(0px , 0px," + data.translateZ  + "px) rotateY(" + data.rotateY + "deg)";
	};

	SlideView.prototype.enableAnimation = function () {
		this.el.classList.add("animateTransform");
	};

	SlideView.prototype.disableAnimation = function() {
		this.el.classList.remove("animateTransform");
	};
});