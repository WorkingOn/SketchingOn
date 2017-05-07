@import 'lib/wo.utils.js'
@import 'lib/wo.request.js'

var wo = wo || {};

wo.token = function(token, path, base_url){
    var 
        _token = token,
        _path = path,
        _isValid = false,
        _validationError,
        _successMessage,
        _base_url = base_url;

    this.set = function(token){
        _token = token;
    };

    this.string = function(){
        return _token;
    };

    this.get = function(path){
        path = path || _path;

        var fileExists = NSFileManager.defaultManager().fileExistsAtPath(path);

        if(!fileExists) return null;

        _token = NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding,nil)
        
        if(!_token || _token.trim().length <= 0) return null;

        return _token;
    };

    this.save = function (){
        var fileManager = NSFileManager.defaultManager()
        fileManager.createFileAtPath_contents_attributes(_path, _token, nil) 
    };

    this.remove = function(path){

    };

    this.verify = function (base_url) {
        base_url = base_url || _base_url;
        
        var url = base_url + "hooks/auth?token="+_token+"&source=sketch";
        var res = wo.request.get(url);

        if(!res || !res.json) {
            _isValid = false;
            _validationError = {
                message: "Invalid token."
            };

            return false;
        }

        if(!res.json.ok) {
            _isValid = false;
            _validationError = res.json;
            return false;
        } else {
            _successMessage = res.json;
        }

        _isValid = true;
        return true;
    };

    this.isValid = function(){
        return _isValid;
    };

    this.validationError = function(){
        return _validationError;
    };

    this.successMessage = function(){
        if(_successMessage) return _successMessage.message;
    };

    return this;
};