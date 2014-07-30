 /* jshint strict: false */
define(['views/SlidedeckView'], function() {
    
    var slides = document.querySelectorAll(".slide");
    new SlidedeckView(document.querySelector("#world"), [
    	{
    		el: slides[0],
    		render: null
    	},
    	{
    		el: slides[1],
    		render: null
    	},
    	{
    		el: slides[2],
    		render: null
    	},
    	{
    		el: slides[3],
    		render: null
    	},
    	{
    		el: slides[4],
    		render: null
    	},
    	{
    		el: slides[5],
    		render: null
    	},
    	{
    		el: slides[6],
    		render: null
    	},
    	{
    		el: slides[7],
    		render: null
    	},
    	{
    		el: slides[8],
    		render: null
    	},
    	{
    		el: slides[9],
    		render: null
    	}
    ]);
});
