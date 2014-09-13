define(['var/querySelector', 'views/PersistentAnimSlideView'], function() {

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
});
