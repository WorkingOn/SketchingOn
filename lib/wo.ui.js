var wo = wo || {};

wo.ui = function(){

    var 
        _logo_url = "http://static.workingon.co/w.png",
        _default_title = "WorkingOn";

    var _setIconFromURL = function(alert, str){
        
        if(!str) str = _logo_url;

        var logoURL = NSURL.URLWithString(str);
        var logo = [[NSImage alloc] initByReferencingURL:logoURL]
        
        [alert setIcon:logo]
        
        return alert;
    };

    this.notify = function (message){
        return [doc showMessage:message];
    };

    this.alert = function (message, title, btns) {
        var 
            alert = [COSAlertWindow new],
            title = title || _default_title,
            buttons = [];

        if(btns) buttons = btns;

        for(var i = 0; i < buttons.length; i++) {
            alert.addButtonWithTitle(buttons[i]);
        }

        _setIconFromURL(alert, _logo_url);

        [alert setMessageText: title]
        [alert setInformativeText: message]
        return ([alert runModal] === 1000);
    };

    this.prompt = function(message, opts) {

        var 
            title = _default_title,
            icon_url = _logo_url,
            buttons = ["Share", "Just Kidding"],
            init = false,
            height = 50,
            width = 275;

        if(!opts) opts = {};
        if(opts.title) title = opts.title;
        if(opts.icon_url) icon_url = opts.icon_url;
        if(opts.buttons) buttons = opts.buttons;
        if(opts.init) init = opts.init;
        if(opts.height) height = opts.height;
        if(opts.width) width = opts.width;

        var accessory = [[NSTextField alloc] initWithFrame:NSMakeRect(0,0,width,height)] 
        if(init) accessory.setStringValue(init);
        
        var alert = [[NSAlert alloc] init]
        
        _setIconFromURL(alert, icon_url);
        
        alert.setMessageText(title);
        alert.setInformativeText(message);
        
        for(var i = 0; i < buttons.length; i++) {
            alert.addButtonWithTitle(buttons[i]);
        }

        alert.setAccessoryView(accessory);
        
        var responseCode = [alert runModal]
        var text = [accessory stringValue]
        
        return [ ( responseCode === 1000 ), text];
    };

    return this;
}();