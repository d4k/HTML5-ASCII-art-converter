var Input = function()
{
    var _this = this;
    var inputFieldId = "source-image-file";
    var inputAreaId = "source-image-area";
    var fileData = null;
    var allowMimeTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];

    var _constructor = function()
    {

    };

    this.loadFromField = function(event)
    {
        loadFile(event.target.files[0]);
    };

    this.loadFromArea = function(event)
    {
        event.stopPropagation();
        event.preventDefault();
        loadFile(event.dataTransfer.files[0]);
    };

    this.areaDragOverHandler = function(event)
    {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    };

    this.getField = function() { return document.getElementById(inputFieldId); };

    this.getArea = function() { return document.getElementById(inputAreaId); };

    this.getFileData = function() { return fileData; }

    this.getAllowMimeTypes = function() { return allowMimeTypes;};

    var loadFile = function(file)
    {
        if(checkMimeType(file) === false) {
            alert("File has deny mime type.");
            throw "File has deny mime type.";
        }

        var reader = new FileReader();
        reader.onload = function(data) {
            fileData = data.target.result;
            previews.setSourceUrl(fileData);
            converter.getCreateButton().disabled = false;
        }
        reader.readAsDataURL(file);
    };

    var checkMimeType = function(file) {
        return _this.getAllowMimeTypes().indexOf(file.type) > -1;
    };

    _constructor.apply(this, arguments);
};
