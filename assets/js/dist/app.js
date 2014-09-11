/*!
 * /? [- /\ |) `/   /= () /?   /< |-| /\ |\| /\ ( /\ |) [- |\/| `/
 *
 * v0.1.0
 * Date: 2014-09-10
 */
(function(window, undefined) {

    "use strict";


var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);




var StartView = (function() {

    var startScreen = $("#start-screen"),
        leaf = $(".start-leaf"),
        leafTrace = $("#leaf-trace"),
        leafLeftTrace = $('#leaf-trace__left'),
        leafRightTrace = $('#leaf-trace__right'),
        topPanel = $(".start-screen__top"),
        bottomPanel = $(".start-screen__bottom"),
        renderTrace = function(path) {
        /**
        *  @see http://jakearchibald.com/2013/animated-line-drawing-svg/
        */

            var length = path.getTotalLength();
            // Clear any previous transition
            path.style.transition = path.style.WebkitTransition =
            'none';
            // Set up the starting positions
            path.style.strokeDasharray = length + ' ' + length;
            path.style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.getBoundingClientRect();
            path.style.visibility = "visible";
            // Define our transition
            path.style.transition = path.style.WebkitTransition =
            'stroke-dashoffset 1.5s ease-in-out';
            // Go!
            path.style.strokeDashoffset = '0';
        };

    return { 
        init: function(onComplete) {
            renderTrace(leafLeftTrace);
            renderTrace(leafRightTrace);

            // TODO: clean up nesting
            setTimeout(function(){
                leafTrace.classList.add("hide");
                leaf.classList.add("show");
                setTimeout(function() {
                    leaf.classList.add("scaleDown");
                    setTimeout(function() {
                        // may possibly need to make panels look seamless
                        // $("#start-screen").style.background = "none";
                        topPanel.classList.add("slideUp");
                        bottomPanel.classList.add("slideDown");
                        setTimeout(function() {
                            // destroy start screen and clear references
                            startScreen.parentNode.removeChild(startScreen);
                            if (onComplete) {
                                onComplete();
                            }
                            startScreen = null;
                            leaf = null;
                            leafTrace = null;
                            leafLeftTrace = null;
                            leafRightTrace = null;
                            topPanel = null;
                            bottomPanel = null;
                            renderTrace = null;
                        }, 600);
                    }, 600);
                }, 500);
            }, 1500);
        }
    };
})();



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

    /**
     * @method hide
     * @desc hide the element by removing it from render tree
     * @see http://stackoverflow.com/questions/11831429/mobile-safari-on-ios-crashes-on-big-pages/14866503#14866503
     * @see http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
     * @see http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
     *
     */
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



    /**
     * @class IframeSlideView
     * @extends SlideView
     * @desc SlideView for managing content heavy iframes
     */
    var IframeSlideView = function(opts) {

        SlideView.apply(this, arguments);
        var iframe = document.createElement("iframe");
        iframe.src = "about:blank";
        /*
        consider adding a load event
        iframe.onload = function() {
        };
        */
        var self = this;
            // TODO make iframe transitions smooth
        iframe.onload = function() {
            self.iframe.style.visibility = "visible";
        };
        this.iframe = iframe;
        this.src = opts.src;
        this.loaded = false;
        this.container = this.el.querySelector(".content--iframe");

        this.container.appendChild(iframe);
    };

    IframeSlideView.prototype = Object.create(SlideView.prototype);
    IframeSlideView.prototype.constructor = IframeSlideView;

    /**
     * @method load
     * @desc loads iframe source
     */
    IframeSlideView.prototype.load = function() {
        if (!this.loaded) {
            this.iframe.src = this.src;
            this.loaded = true;
            this.iframe.style.visibility = "hidden";
        }
    };

    /**
     * @method destroy
     * @desc clears iframe by adding blank page
     */
    IframeSlideView.prototype.destroy = function() {
        if (this.loaded) {
            this.iframe.src = "about:blank";
            this.loaded = false;
        }
    };




var ua = navigator.userAgent||navigator.vendor||window.opera,
	isMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))),
	isTablet = /android|ipad|playbook|silk/i.test(ua),
	// small screen based off media query dimensions
	isSmallScreen = window.innerWidth < 641,
	// adapted from https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js#L9
	supportWebGL =  ( function () { try { var canvas = document.createElement( 'canvas' ); return !! (window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) )); } catch( e ) { return false; } } )();




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

        if (opts.setup) {
            this.setup = opts.setup;
        }
        this.played = false;

    };

    AnimSlideView.prototype = Object.create(SlideView.prototype);
    AnimSlideView.prototype.constructor = AnimSlideView;

    /**
     * @method setup
     * @desc makes preparations before animation
     */
    AnimSlideView.prototype.setup = null;
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



    var HelloKASlideView = new AnimSlideView({
        el: $("#hello-ka"),
    });


    var KeylightSlideView = new IframeSlideView({
        el: $("#keylight"),
        src: "http://hakim.se/experiments/html5/keylight/03/#488x845_311x688_193x505_213x329_338x237_477x333_622x229_774x331_763x523_677x684_2"
    });


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




    /**
     * @class PersistentAnimSlideView
     * @extends AnimSlideView
     * @desc SlideView for animations that loop or have infinite frames
     */
    var PersistentAnimSlideView = function(opts) {

        AnimSlideView.apply(this, arguments);
        if (opts.setup) {
            this.setup = opts.setup;
        }

        if (opts.pause) {
            this.pause = opts.pause;
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



var VideoSlideView;

(function() {

var canvas = $("#videoCanvas"),
    ctx = canvas.getContext("2d"),

    bgCanvas = document.createElement("canvas"),
    bgCtx = bgCanvas.getContext("2d"),

    canvasW,
    canvasH,
    imageData,
    keyword = "V I D E O",
    rowGap = 10,
    columnGap = 10,
    requestId,
    playing = false,
    particles;

 
var draw = function() {
    ctx.clearRect(0, 0, canvasW, canvasH);
    // add text shadows
    ctx.shadowColor = "#000";
    ctx.shadowBlur = "4";
    // draw
    var p,x,y;
    ctx.lineWidth = 1;
    for (var i = 0; i < particles.length; i++) {

        var width   = columnGap - 2,
            height  = rowGap;
        p = particles[i];
        x = p.x;
        y = p.y;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        ctx.beginPath();
        ctx.moveTo( x, y);

        // oscillate between a threshold
        ctx.lineTo(x + (2 + Math.random() * width), y);
    

        ctx.closePath();
        ctx.stroke();
       
    }
    if (playing) {
        requestId = requestAnimationFrame(draw);
    }
    
 };

    VideoSlideView = new PersistentAnimSlideView({
        el: $("#video"),
        setup: function() {
            if (!this.ready) {
                var textMetrics,
                    worker;
                canvasW = this.el.querySelector('.content-wrapper').offsetWidth;
                canvasH = this.el.querySelector('.content-wrapper').offsetHeight;

                canvas.width = canvasW;
                canvas.height = canvasH;
                bgCanvas.width = canvasW;
                bgCanvas.height = canvasH;


                bgCtx.font = "125px bold Oswald ";
                // Fill the keyword text onto the bgCanvas.
                textMetrics = bgCtx.measureText(keyword);
                // console.log(textMetrics);
                // draw text relative to its vertical middle
                bgCtx.textBaseline = "middle";
                bgCtx.fillText(keyword, ( canvasW / 2 ) - ( Math.round( textMetrics.width /2 ) ) , (canvasH / 2));
                imageData = bgCtx.getImageData(0, 0, canvasW, canvasH).data;
               
                // TODO resize text if too big
                worker = new Worker("js/thread/prepareVideoSlideView.min.js");
                worker.addEventListener("message", function(e) {
                    particles = e.data.message;
                    draw();
                    console.log(e.data);
                    worker.terminate();
                    worker = null;
                });

                // tell worker to begin image processing
                worker.postMessage({
                    canvasW: canvasW,
                    canvasH: canvasH,
                    imageData: imageData
                });
            }
            this.ready = true;
        },
        play: function() {
            playing = true;
            requestId = requestAnimationFrame(draw);

        },
        pause: function() {
            // console.log("pause");
            playing = false;
            cancelAnimationFrame(requestId);
        }
    });

})();

         


    var AaronTropeSlideView = new WebGLIframeSlideView({
        el: $("#aaron-trope"),
        src: "http://www.aaronkoblin.com/Aaronetrope/"
    });



    var HelloRacerSlideView = new WebGLIframeSlideView({
        el: $("#hello-racer"),
        src: "http://helloracer.com/webgl/"
    });



    var MazeSlideView;
    (function() {
        var maze = document.querySelector("#maze"),
        playButton = document.querySelector("#play-maze"),
        stepButton = document.querySelector("#step-maze"),
        resetButton = document.querySelector("#reset-maze"),
        numCols = 5,
        numRows = numCols,
        width = maze.clientWidth, // width of padding-box
        height = maze.clientHeight, // height of padding-box
        workingWidth = width / numCols,
        workingHeight = height / numRows,
        boxWidth = Math.ceil(workingWidth * 0.9),
        boxHeight = Math.ceil(workingHeight * 0.9),
        // recall that there are numRows - 1 borders per col
        smallDimension = (width - boxWidth * numRows) / (numRows - 1),
        // true indicates unexplored
        row = Array.apply(null, {length : numCols}).map(function(){return { unexplored: true, node: null}; }),
        // call slice to create deep copy
        grid = Array.apply(null, {length: numRows}).map(function(dontcare, j){

            // deep copy the value of each row
            return Array.prototype.slice.call(row).map(function(el, i){
                
                return {unexplored: el.unexplored, node: el.unexplored, y: j, x: i};
            }); 

        }),

       /**
        * @function shuffle
        *
        * uses Fisher-Yates_shuffle
        * To shuffle an array a of n elements (indices 0..n-1):
        * for i from n − 1 downto 1 do
        *      j ← random integer with 0 ≤ j ≤ i
        *      exchange a[j] and a[i]
        *
        * @param Array
        * @return  arr // Note that we are modifiying in place, so you don't have to use return value
        */  
        shuffle = function(arr) {

            var j , temp;
            for (var i = arr.length - 1; i > 0; i-- ) {

                j = Math.floor( Math.random() * i + 1) - 1;

                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }

            return arr;
        },
        NORTH = 1,
        SOUTH = 2,
        EAST = 3,
        WEST = 4,
        // stack implementation variables
        stack = [],
        layoutGrid = function() {
            var i = 0,
                j = 0,
                hBoundary =  numCols - 1,
                vBoundary = numRows - 1,
                rightX = boxWidth,
                rightY = 0,
                bottomX = 0,
                bottomY = boxHeight,
                div;


                // go vertically
                for (j = 0; j < numRows; j++) {
               
                    // traverse horizontally
                    for (i = 0; i < numCols; i++) {

                        // drawBox;
                        div = document.createElement("div");
                        div.style.position = "absolute";
                        div.style.width = boxWidth + "px";
                        div.style.height = boxHeight + "px";
                        div.style.left = bottomX + "px";
                        div.style.top = rightY + "px";
                        div.style.backgroundColor = "#333";
                        maze.appendChild(div);

                        grid[j][i].node = div;

                        // haven't hit horizontal boundary
                        if (i < hBoundary) {
                            div = document.createElement("div");
                            div.style.backgroundColor = "black";
                            div.style.position = "absolute";
                            div.style.width = smallDimension + "px";
                            
                            // TODO: optimize
                            // right now we are using overflow: hidden to hide extra fluff
                            // if we are not rendering top row
                            // adjust positioning to account for corners
                            if (j > 0) {
                                div.style.height = boxHeight + (2 * smallDimension) + "px";
                                div.style.top = rightY - smallDimension + "px";
                            } else {
                                
                               div.style.height = boxHeight + smallDimension + "px";
                               div.style.top = rightY + "px";
                            }

                            div.style.left = rightX + "px";
                            maze.appendChild(div);
                            grid[j][i].rightBorderNode = div;

                            rightX += boxWidth + smallDimension;
                        } 

                        // haven't hit vertical boundary
                    
                        if (j < vBoundary) {

                            div = document.createElement("div");
                            div.style.backgroundColor = "black";
                            div.style.position = "absolute";

                            // TODO: optimize
                            // right now we are using overflow: hidden to hide extra fluff
                            // if we are not rendering leftmost column
                            // adjust positioning to account for corners
                            if (i > 0) {
                                div.style.left = bottomX - smallDimension + "px";
                                div.style.width = boxWidth + (2 * smallDimension) + "px";
                            } else {
                                div.style.left = bottomX + "px";
                                div.style.width = boxWidth + smallDimension + "px";
                            }
                            div.style.height = smallDimension + "px";
                            div.style.top = bottomY + "px";
                            
                            maze.appendChild(div);

                            grid[j][i].bottomBorderNode = div;

                        } 
                        // move out of if statement because we need to layout out boxes
                        bottomX += boxWidth + smallDimension;
                        
                    }

                    bottomX = 0;
                    bottomY += boxHeight + smallDimension;
                    rightY += boxHeight + smallDimension;
                    rightX = boxWidth;

               
                }
              
        },
        getNeighbors = function(y, x) {
            
            var neighbors = [];
            if (y - 1 >= 0) {
                neighbors.push({
                    cell: grid[y - 1][x],
                    name: NORTH
                });
            }

            if (y + 1 < numRows) {
                neighbors.push({
                    cell: grid[y + 1][x],
                    name: SOUTH
                });
            }

            if (x + 1 < numCols) {
                neighbors.push({
                    cell: grid[y][x + 1],
                    name: EAST
                });
            }

            if (x - 1 >= 0) {
                neighbors.push({
                    cell: grid[y][x - 1],
                    name: WEST
                });
            }

            return neighbors;
        },
        reset = function() {
            grid.forEach(function(row) {
                row.forEach(function(el){
                    el.unexplored = true;
                    el.node = null;
                    el.bottomBorderNode = null;
                    el.rightBorderNode = null;

                });
            });
            maze.innerHTML = "";
            layoutGrid();
            stack.push({cell: grid[0][0], neighbors: shuffle(getNeighbors(0,0))});
        },
        step = function() {

            var curCellData,
                curCell,
                y,
                x,
                neighbors,
                nbr,
                style,
                styleAdjustProp,
                wall;
            if (stack.length) {

                curCellData = stack.pop();
                curCell = curCellData.cell;
                y = curCell.y;
                x = curCell.x;
                  

                // indicate as explored
                curCell.node.style.backgroundColor = "lime";
                curCell.unexplored = false;
        
                neighbors = curCellData.neighbors;
              
                // find unexplored neighbor
                while ((nbr = neighbors.pop()) && nbr.cell && !nbr.cell.unexplored) {}
                
                if (nbr) {

                    // remove wall
                    if (nbr.name === NORTH ) {

                        wall = nbr.cell.bottomBorderNode;
                        nbr.cell.bottomBorderNode = null;
                        styleAdjustProp = "height";
                        style = nbr.cell.node.style;

                    } else if (nbr.name === SOUTH) {

                        wall = curCell.bottomBorderNode;
                        styleAdjustProp = "height";
                        curCell.bottomBorderNode = null;
                        style = curCell.node.style;
                        
                    } else if (nbr.name === EAST) {

                        wall =  curCell.rightBorderNode;
                        curCell.rightBorderNode = null;
                        styleAdjustProp = "width";
                        style = curCell.node.style;

                    } else {

                        wall = nbr.cell.rightBorderNode;
                        nbr.cell.rightBorderNode = null;
                        styleAdjustProp = "width";
                        style = nbr.cell.node.style;
                       
                    }

                    if (wall) {
                        wall.parentNode.removeChild(wall);
                        style[styleAdjustProp] = parseFloat(style[styleAdjustProp]) + smallDimension + "px";
                    }

                    // push cell back even if there are no neighbors left
                    // so that we can indicate backtracking
                    stack.push(curCellData);

                    // push cell of neighbors
                    nbr.cell.unexplored = false;
                    stack.push({cell: nbr.cell, neighbors: shuffle(getNeighbors(nbr.cell.y, nbr.cell.x))});
                } else {
                    // indicate backtracking
                    curCell.node.style.backgroundColor = "white";
                }

                return true;
            } else {
                return false;
            }
        },
        setButtonsInactive = function() {
            playButton.classList.remove("active");
            stepButton.classList.remove("active");
        },
        resetButtons = function() {
            playButton.classList.add("active");
            stepButton.classList.add("active");
        },
        loop = function() {
            if (step()) {
                setTimeout(loop, 50);
            } else {
                setButtonsInactive();
            }
        };



        MazeSlideView = new PersistentAnimSlideView({
            el: $("#depth-first-search"),
            setup: function() {

                if (!this.ready) {
                    stack.push({cell: grid[0][0], neighbors: shuffle(getNeighbors(0, 0))});
                    layoutGrid();


                    playButton.addEventListener("click", function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        loop();
                    });
                    stepButton.addEventListener("click", function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        if (!step()) {
                            setButtonsInactive();
                        }
                    });
                    resetButton.addEventListener("click", function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        reset();
                        resetButtons();
                    });

                    this.ready = true;
                }
            },
            play: loop
        });
    })();


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


// https://developer.mozilla.org/en-US/docs/Web/Events/wheel

// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
(function(window,document) {

    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            console.log("DOMMouseScroll");
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }

})(window,document);



// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


 /* jshint strict: false */


var transEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
    'MozTransition'    : 'transitionend',      // only for FF < 15
    'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
},
transEndEvent = transEndEventNames[ Modernizr.prefixed('transition') ];



var SlidedeckView = function(el, slides) {
 
    var frames = slides,
        lastFrameIndex = frames.length - 1,
        wheelDelta = 0,
        perspective = 3000, // corresponds to value for webkit perspective
        vanishingPoint = 19000,
        focusPoint = -1500,
        dampConstant = 1, // 0.2
        ticking = false, 
        
        perspectiveOffset = 500, // 1500
        isMouseWheel = false,
        curIdx = 0,
        currentFrame = frames[curIdx],
        prevFrame = frames[curIdx - 1],
        nextTwoFrame = frames[curIdx + 2],
        nextFrame = frames[curIdx + 1],
        // arrow keys
        KEY_LEFT = 37,
        KEY_RIGHT = 39,
        KEY_UP = 38,
        KEY_DOWN = 40;

    var hammerTime = new Hammer.Manager(el, {
        recognizers: [
            // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
            [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
        ]
    });

    function _updateSlideReferences() {
        currentFrame = frames[curIdx];
        prevFrame = frames[curIdx - 1];
        nextFrame = frames[curIdx + 1];
        nextTwoFrame = frames[curIdx + 2];
    }

    function _renderSlide() {

        _updateSlideReferences();
        frames.forEach(function(f, i){
            f.enableAnimation();
        });
        wheelDelta = curIdx > 0 ? perspective * curIdx : 0;
        requestTick();
    }

    function nextSlide() {


        if (curIdx < lastFrameIndex) {
            curIdx += 1;
            _renderSlide();
        }
       
    }

    function previousSlide() {

        if (curIdx >= 1) {
            curIdx -= 1;
            _renderSlide();
        }
        
    }


    function handleKeys(e) {
      
        var keyCode = e.keyCode;
        if (keyCode === KEY_LEFT || keyCode === KEY_DOWN) {

            previousSlide();
            
        } else if (keyCode === KEY_RIGHT || keyCode === KEY_UP) {
           
            nextSlide();
        }
        
    }

   

    function handleMouseWheel(e) {
        wheelDelta += e.deltaY * dampConstant;
        // console.log("requesting Tick");
        isMouseWheel = true;
        requestTick();
    }

    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    function calculateRotation(translateZ) {
        // before a slide moves completely out of view (perspective == translateZ),
        // add rotations
        return (translateZ >= focusPoint && translateZ <  perspective) ? ((translateZ - focusPoint) / perspective) * 90 : 0;
        
    }

    function calculateOpacity(z) {

        // normalize z relative to focus point
        z = Math.abs(z) + focusPoint;
        // the further we're away the more transparent the slide gets
        return (z < vanishingPoint) ? 1 - (z / vanishingPoint): 0;
        

    }

    /**
     * @function playAfterTransition
     * @desc plays slide after transition ends, i.e. slide stops moving
     */
    function playAfterTransition(){
        // console.log("transitionend");
        // console.log(currentFrame);
        currentFrame.play();
        currentFrame.el.removeEventListener(transEndEvent, playAfterTransition);
    }

    /**
     * @function update
     * @desc updates slide deck within animation frame
     */
    function update() {

        var translateZ,
            rotateY,
            opacity;

        if (isMouseWheel) {
            frames.forEach(function(f, i){
                f.disableAnimation();
            });   
        }


        frames.forEach(function(f, i) {

            translateZ =  (focusPoint + (-perspective * i) + wheelDelta);

            if (isMouseWheel && translateZ > focusPoint && translateZ <  perspective) {
                curIdx = i;
                _updateSlideReferences();
            }
           
            // add some additional offset if slide should be offScreen
            if (i < curIdx) {
                translateZ += perspectiveOffset;
            }
            
            rotateY = calculateRotation(translateZ);

            // make sure we don't rotate past 90
            if (rotateY > 90) {
                rotateY = 90;
            }

            opacity = calculateOpacity(translateZ);

            if (opacity > 0 && i >= (curIdx - 1)) {
                f.update({
                    opacity: opacity,
                    rotateY: rotateY,
                    translateZ: translateZ
                });
            } else {
                f.hide();
            }

        });

        
        if (currentFrame) {

            if (currentFrame.play) {
                if (isMouseWheel) {
                    if (!currentFrame.played) {
                        currentFrame.play();
                    }
                } else {
                  
                    currentFrame.el.addEventListener(transEndEvent, playAfterTransition);
                    
                }

            }

            if (currentFrame.load) {
              currentFrame.load();  
            }
        }

        if (nextFrame) {
            // browser bug in Chrome where
            // loading Youtube Iframe or Canvas with lowered opacity
            // messes up zIndex layering
            // fixed by setting to full opacity
            if (nextFrame.el.id === "networking" || nextFrame.el.id === "video" || nextFrame.el.id === "graphics") {
                nextFrame.el.style.opacity = "1.0";
            }

            if (nextFrame.destroy) {
                nextFrame.destroy();
            }

            if (nextFrame.pause) {
                nextFrame.pause();
            }
            /*
                console.log(nextFrame.el.id);
                if (nextFrame && nextFrame.load) {
                    console.log(nextFrame.id);
                    nextFrame.load();
                }
            */
        }

        if (nextTwoFrame) {
            if (nextTwoFrame.setup) {
                nextTwoFrame.setup();
            }
        }

        /*
            TODO consider refreshing previous frame instead
            of deleting it
            
            if (prevFrame && prevFrame.load) {
                prevFrame.load();
            }
        */
        if (prevFrame) {
            if  (prevFrame.destroy) {
                prevFrame.destroy();
            }
            if (prevFrame.pause) {
                prevFrame.pause();
            }
        }

        if (isMouseWheel) {
            isMouseWheel = false;
        }
        
        ticking = false;
    }

    if (isMobile || isSmallScreen) {
        // current experience does not perform scrolling jacking for
        // mobile experiences
        // treat slide deck as if it were static
        frames.forEach(function(f,i){
            if (f instanceof AnimSlideView && !(f instanceof PersistentAnimSlideView) && f.play) {
                if (f.setup) {
                    f.setup();
                }
                f.play();
            }
        });

    } else {

        if (Modernizr.csstransforms3d) {
            requestTick();

            // init event listeners
            hammerTime.on("swipeleft", nextSlide);
            hammerTime.on("swiperight", previousSlide);
            window.addEventListener("keyup", handleKeys);
            addWheelListener(window, handleMouseWheel);
        }
    } 

    this.getFrames = function() {
        return frames;
    };
    this.play =  function(idx) {
        var frame = frames[idx];
        if (frame && frame.play) {
            frame.play();
        }
    };

};



 /* jshint strict: false */

    var slides = $$(".slide"),
        slideDeck = new SlidedeckView($("#world"), [
            // Hello Khan Academy
            HelloKASlideView,
            // What
            new SlideView({
                el: slides[1],
            }),
            // Specifics
            new SlideView({
                el: slides[2],
            }),
            // Research
            new SlideView({
                el: slides[3],
            }),
            // HTML5 Expansions
            new SlideView({
                el: slides[4],
            }),
            // Audio
            new SlideView({
                el: slides[5],
            }),
            // Sound Visualization
            KeylightSlideView,
            // Networking
            NetworkingSlideView,
            // Chrome Racer
            new SlideView({
                el: slides[8],
            }),
            // Video Introduction
            VideoSlideView,
            // Aaron Trope
            AaronTropeSlideView,
            // Graphics
             new SlideView({
                el: slides[11],
            }),
            // Hello Racer
            HelloRacerSlideView,
            // Visualizing Algorithms
            new SlideView({
                el: slides[13],
            }),
            // Maze Slide View
            MazeSlideView,
            // Enable
            new SlideView({
                el: slides[15],
            }),
            // Anthony Su
            new SlideView({
                el: slides[16],
            }),
            // I'm Ready
            ReadySlideView,
            // Credits
            new SlideView({
                el: slides[18],
            })
        ]);
        StartView.init(function() {
            slideDeck.play(0);
        });
        
        if (window.console) {
            console.log(document.childNodes[1].nodeValue);
        }


})(this);
