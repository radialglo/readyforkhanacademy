// self is a reference to the global object
// however  WorkerGlobalScope does not have
// a synonmous window property that Window object have

var handleMessage = function(e) {


    var msg = e.data,
        canvasW = msg.canvasW,
        canvasH = msg.canvasH,
        imageData = msg.imageData,
        pixel,
        particles = [],
        colors = ["grey", "yellow", "teal", "lime", "magenta" , "red", "blue"],
        color,
        rowGap = 10,
        columnGap = 10;


    for (var height = 0; height < canvasH; height += rowGap) {

        color = colors[(height / rowGap)  % colors.length];
        for (var width = 0; width < canvasW; width += columnGap) {

    

            var index = ((width + (height * canvasW)) * 4) - 1;
            // get the alpha value
            // https://github.com/kennethcachia/Shape-Shifter/blob/master/scripts/shape-builder.js
            // data is a one dimensional array containing the data in the RGBA order, with integer values 0 and 255
            // we can check if the pixel was drawn if it has an alpha value greater than 0
            pixel = imageData[index];

            if (pixel > 0) {
                particles.push({
                    color: color,
                    x: width,
                    y: height
                });
            }

        }
    }

    self.postMessage({post: true, message: particles});
}

self.addEventListener("message", handleMessage);
