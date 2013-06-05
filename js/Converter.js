var Converter = function()
{
    var _this = this;
    var usedTextInputId = "input-used-text";
    var fontSizeInputId = "input-font-size";
    var backgroundColorInputId = "input-background-color";
    var backgroundTransparentInputId = "input-background-transparent";
    var createButtonId = "create-button";
    var fullScreenButtonId = "full-screen-button";
    var canvasId = "canvas";
    var canvasWidth = 0;
    var canvasHeight = 0;
    var usedTextWidth = 0;
    var usedTextHeight = 0;
    var nextUsedChar = 0;

    var _constructor = function()
    {

    };

    this.convert = function()
    {
        countUsedTextSize();
        var image = previews.getSource();
        setCanvasWidth(image.width);
        setCanvasHeight(image.height);
        getCanvasContext().drawImage(image, 0, 0);
        previews.getResult().width = image.width;
        previews.getResult().height = image.height;
        previews.getResult().src = getResultData();
        _this.getFullScreenButton().disabled = false;
    };

    this.fullScreen = function()
    {
        window.open(previews.getResult().src);
    };

    this.getUsedTextField = function() { return document.getElementById(usedTextInputId); };

    this.getFontSizeField = function() { return document.getElementById(fontSizeInputId); };

    this.getBackgroundColorField = function() { return document.getElementById(backgroundColorInputId); };

    this.getBackgroundTransparentField = function() { return document.getElementById(backgroundTransparentInputId); };

    this.getCreateButton = function() { return document.getElementById(createButtonId); };

    this.getFullScreenButton = function() { return document.getElementById(fullScreenButtonId); };

    this.getUsedText = function() {return _this.getUsedTextField().value; };

    this.getFontSize = function() { return _this.getFontSizeField().value; };

    this.getBackgroundColor = function() { return (_this.getBackgroundTransparent() == true) ? "rgba(0,0,0,0)" : _this.getBackgroundColorField().value; };

    this.getBackgroundTransparent = function() { return _this.getBackgroundTransparentField().checked; };

    var getResultData = function()
    {
        var pixelsList = getAvgPixelsGrid();
        var context = getCanvasContext();
        var width = getCanvasWidth();
        var height = getCanvasHeight();

        context.clearRect(0, 0, width, height);
        context.fillStyle =  _this.getBackgroundColor();
        context.fillRect(0, 0, width, height);

        for (var i = 0; i < pixelsList.length; i++) {
            var px = pixelsList[i];
            context.fillStyle = "rgba(" + px.r +", " + px.g + ", " + px.b + ", " + px.a + ")";
            context.font = _this.getFontSize() + "px Monospace";
            context.fillText(getNextUsedChar(), px.x, px.y);
        }

        return getCanvas().toDataURL();
    };

    var getNextUsedChar = function()
    {
        var str = _this.getUsedText();

        var re = str.substring(nextUsedChar, nextUsedChar+1);
        nextUsedChar++;
        if(nextUsedChar == str.length) {
            nextUsedChar = 0;
        }
        return re;
    };

    var getSourceData = function() {
        return getCanvasContext().getImageData(0, 0, getCanvasWidth(), getCanvasHeight()).data;
    };

    var getPixelsGrid  =function()
    {
        var sourceData = getSourceData();

        var res = [];
        for (var i = 0; i < sourceData.length; i += 4) {
            var y = Math.floor(i / (getCanvasWidth() * 4));
            var x = (i - (y * getCanvasWidth() * 4)) / 4;
            if (typeof res[x] === "undefined") {
                res[x] = [];
            }
            res[x][y] = {
                r: sourceData[i+0],
                g: sourceData[i+1],
                b: sourceData[i+2],
                a: sourceData[i+3]
            }
        }
        return res;

    };

    var getAvgPixelsGrid = function()
    {
        var pixelsGrid = getPixelsGrid();

        var res = [];
        var stepX = getUsedTextWidth();
        var stepY = getUsedTextHeight();
        var countStepsX = getCanvasWidth() / stepX;
        var countStepsY = getCanvasHeight() / stepY;

            for (var y = 0; y < countStepsY; y++) {
                for (var x = 0; x < countStepsX; x++) {
                res.push({
                    x: x * stepX,
                    y: y * stepY,
                    r: pixelsGrid[x * stepX][y * stepY].r,
                    g: pixelsGrid[x * stepX][y * stepY].g,
                    b: pixelsGrid[x * stepX][y * stepY].b,
                    a: pixelsGrid[x * stepX][y * stepY].a
                });
            }
        }
        return res;

    };

    var countUsedTextSize = function()
    {
        var block = document.createElement("span");
        block.innerHTML = _this.getUsedText()[0];
        block.style.fontSize = _this.getFontSize()+"px";
        block.style.fontFamily = "Monospace";
        document.body.appendChild(block);
        setUsedTextWidth(block.offsetWidth);
        setUsedTextHeight(Math.floor(block.offsetHeight - (block.offsetHeight * 0.2)));
        document.body.removeChild(block);
    };

    var getCanvas = function() { return document.getElementById(canvasId); };

    var getCanvasContext = function() { return getCanvas().getContext("2d"); };

    var getCanvasWidth = function() { return canvasWidth; };
    var setCanvasWidth = function(val) { return getCanvas().width = canvasWidth = val * 1; };

    var getCanvasHeight = function() { return canvasHeight; };
    var setCanvasHeight = function(val) { return getCanvas().height = canvasHeight = val * 1; };

    var getUsedTextWidth = function() { return usedTextWidth; };
    var setUsedTextWidth = function(val) { return usedTextWidth = val * 1; };

    var getUsedTextHeight = function() { return usedTextHeight; };
    var setUsedTextHeight = function(val) { return usedTextHeight = val * 1; };

    _constructor.apply(this, arguments);
};
