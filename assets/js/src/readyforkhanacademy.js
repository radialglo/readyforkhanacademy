 /* jshint strict: false */
define(['var/querySelector','views/StartView', 'views/SlidedeckView', 'views/VideoSlideView'], function() {
    
    var slides = $$(".slide");
    new SlidedeckView($("#world"), [
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
    	},
        {
            el: slides[10],
            render: null
        },
        {
            el: slides[11],
            render: null
        },
        {
            el: slides[12],
            render: null
        },
        {
            el: slides[13],
            render: null
        }
    ]);
});
