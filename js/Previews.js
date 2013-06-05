var Previews = function()
{
    var _this = this;
    var sourceId = "image-source";
    var resultId = "image-result";

    var _constructor = function()
    {

    };

    this.getSource = function() { return document.getElementById(sourceId); };

    this.getResult = function() { return document.getElementById(resultId); };

    this.setSourceUrl = function(url) { return _this.getSource().src = url; };

    _constructor.apply(this, arguments);
};
