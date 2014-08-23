define([], function() {
  var canvas = document.querySelector("#videoCanvas"),
            ctx = canvas.getContext("2d");

        var bgCanvas = document.createElement("canvas");
        var bgCtx = bgCanvas.getContext("2d"),
            canvasW = document.querySelector("#video .content-wrapper").offsetWidth,
            canvasH = document.querySelector("#video .content-wrapper").offsetHeight,
            keyword = "V I D E O",
            imageData,
            rowGap = 10,
            columnGap = 10;

         canvas.width = canvasW;
         canvas.height = canvasH;
         bgCanvas.width = canvasW;
         bgCanvas.height = canvasH;
         // rem works
         /*
         bgCtx.font = "200px 'Arial'";
         bgCtx.font= '"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Garuda,Verdana,Tahoma,sans-serif';
         */
         // bgCtx.font = "bold 200px Oswald ";
         bgCtx.font = "125px bold Oswald ";
         //Fill the keyword text onto the bgCanvas.
         var textMetrics = bgCtx.measureText(keyword);
         console.log(textMetrics);
         // draw text relative to its vertical middle
         bgCtx.textBaseline = "middle";
         bgCtx.fillText(keyword, ( canvasW / 2 ) - ( Math.round( textMetrics.width /2 ) ) , (canvasH / 2));
         imageData = bgCtx.getImageData(0, 0, canvasW, canvasH).data;
         // https://github.com/kennethcachia/Shape-Shifter/blob/master/scripts/shape-builder.js
         // data is a one dimensional array containing the data in the RGBA order, with integer values 0 and 255
         // we can check if the pixel was drawn if it has an alpha value greater than 0
         // console.log(imageData),

         var pixel,
            particles = [],
            colors = ["grey", "yellow", "teal", "lime", "magenta" , "red", "blue"],
            // colors = ["#4387fd", "#125758", "#01a2ff", "#0cf"],
            color;
         for (var height = 0; height < canvasH; height += rowGap) {
             // color = colors[Math.floor((Math.random() * 100))  % colors.length];
            color = colors[(height / rowGap)  % colors.length];
            for (var width = 0; width < canvasW; width += columnGap) {

                // get the alpha value
                var index = ((width + (height * canvasW)) * 4) - 1;
                pixel = imageData[index];
                console.log(index);
                console.log(pixel);
                if (pixel > 0) {
                    particles.push({
                        color: color,
                        x: width,
                        y: height
                    });
                }

            }
         }

        // document.body.appendChild(bgCanvas);

         console.log(particles);

         var draw = function() {

         // color = colors[Math.floor((Math.random() * 100))  % colors.length];

         var end = Math.floor(canvasW / columnGap / 5);

         /*
         for (var i = 0; i < particles.length; i++) {
                if ((i % end) === 0) {
                    // console.log(true);
                    color = colors[Math.floor((Math.random() * 100))  % colors.length];
                } else {
                    // console.log(false);
                }
                particles[i].color = color;
         }
         */
         // ctx.fillStyle = "black";
         ctx.clearRect(0, 0, canvasW, canvasH);
         // ctx.fillRect(0, 0, canvasW, canvasH)
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
            ctx.moveTo( x, y - height / 2 );

            ctx.lineTo(x + (2 + Math.random() * width), y - height / 2);
            /*
            ctx.lineTo( x + width / 2, y - height / 4 );
            ctx.lineTo( x + width / 2, y + height / 4 );
            ctx.lineTo( x, y + height / 2 );
            ctx.lineTo( x - width / 2, y + height / 4 );
            ctx.lineTo( x - width / 2, y - height / 4 );
            ctx.lineTo( x, y - height / 2 );
            */

            ctx.closePath();
            ctx.stroke();
            // ctx.fill();
         }
            requestAnimationFrame(draw);
         }
         requestAnimationFrame(draw);
});
