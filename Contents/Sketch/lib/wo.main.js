var wo = wo || {};
@import 'lib/wo.utils.js'
@import 'lib/wo.request.js'
@import 'lib/wo.ui.js'
@import 'lib/wo.token.js'


var 
    API_URL = "https://api.workingon.co/",
    TOKEN_PATH = NSHomeDirectory() + "/.wo.token",
    UPLOAD_URL = "https://api.cloudinary.com/v1_1/workingon/auto/upload";

wo.sketch = function(){
    var selection, doc; 

    this.setContext = function(context){
        this.selection = context.selection;
        this.doc = context.document; 

        selection = this.selection;
        doc = this.doc;
    
    };


    this.workit = function(){

        var str = [], token = this.readToken(), filePaths=[], parent;

        parent = this.getParentItem();

        if([selection count] == 0){

            var names = doc.pages() || doc.artboards();

            for (var i = 0; i < names.count(); i++) {
                var item = names[i]

                if (item.name) {
                    str.push(item.name());
                }

            }

        } else {
            str.push(parent.name)
        }

        str = str.join(", ");
        
        var task = wo.ui.prompt("What are you working on?", {
            init: str + " design"
        });

        if(task[0]) task = task[1];
        else task = null;
       
        var authed = this.getAuth(token);
        
        wo.utils.debug("authed: " + authed.json);

        if(!task) return;

        //Export images and upload them
        var image;
        if(authed.json && authed.json.images){
            var paths = this.exportSelection();
            
            wo.utils.debug("paths: "+ paths);

            if(this.youSureTho(paths) && paths && paths.length > 0){
                image = this.uploadImages(authed.json, paths);
            }
        }

        var result = this.postTask(API_URL+"hooks/incoming", task, image, token);

        if(!result) {

            wo.ui.notify("There was an issue saving your task. Please try again.");

        } else if(result.code && result.message) {

            wo.ui.notify(result.message);

        } else if(result.user) {

            wo.ui.notify("Task posted.");

        }   
    }; //put your thing down...


    this.youSureTho = function(paths) {
        var eh = "Include this export?";
        
        if(!paths || paths.length <= 0) return false;
        
        var imgStr = paths.map(function(p){
            return p.substring(p.lastIndexOf("/")+1,p.length);
        })[0];

        return wo.ui.alert(imgStr, eh, ["Yeah", "Nah"]);
    };


    //So Sketchy

    this.getParentItem = function() {
        var loop = [selection objectEnumerator]
        var parent = nil, next = nil, hasParent = false, parents = {}, d = 0, pstr = "", c= 0;

        while (parent = [loop nextObject]) {
            d = 1
            next = parent
            while(next && next.name && next.parentGroup && c < 100) {
                parent = next;
                next = parent.parentGroup();
                if(parent.name) {
                    if(!parents[parent.name() + ":" + parent.className()]) parents[parent.name() + ":" + parent.className()] = {name: parent.name(), depth: d, count: 1, type: parent.className(), c: c};
                    else parents[parent.name() + ":" + parent.className()].count++;
                }
                d++;
                c++;
            }
        }   

        var parentsArr = [];
        for(var i in parents) {
            parentsArr.push(parents[i]);
        }   

        parentsArr = parentsArr.sort(function(a,b){
            if(b.count - a.count == 0) return a.depth - b.depth;
            else return b.count - a.count;
        });

        filteredParentsArray = parentsArr.filter(function(ele){
            return ele.type == "MSPage" || ele.type == "MSArtboardGroup";
        });
        
        if(filteredParentsArray.length > 0 && [[doc artboards] count] > 0) {
            parentsArr = filteredParentsArray;
        }

        var item = parentsArr.reverse().pop();
        var name = null;

        if(item && item.name) name = item.name;

        return {
            name: name
        };  
    };

    this.copyLayerWithFactor = function (originalSlice, factor) {

        var 
            copy = [originalSlice duplicate],
            rect = [[copy absoluteRect] rect];

        var slice = MSExportRequest.new(); 

        slice.rect = rect; 
        slice.scale = factor; 

        [copy removeFromParent];

        return slice;
    };

    this.exportSelection = function(){

        var 
            exports = [], 
            name,
            path,
            slice,
            layer;
        
        for (var i = 0; i < [selection count]; i++) {
            layer = [selection objectAtIndex:i];
            name = [layer name];
            path = NSTemporaryDirectory() + name + ".png";
            slice = this.copyLayerWithFactor(layer, 1);

            [doc saveArtboardOrSlice:slice toFile: path];

            exports.push(path)
        };

        return exports;
    };


    //API: Talk to us

    this.getAuth = function(token){
        var url = API_URL + "hooks/auth?token="+token+"&source=sketch";
        return wo.request.get(url);
    };

    this.postTask = function (url, message, image, token){
        var qs = "token="+token+"&task="+encodeURIComponent(message)+"&source=sketch";
        if(image) qs += "&image="+ encodeURIComponent(image);

        return wo.request.post(url, qs).json;
    };

    this.uploadImages = function (auth, paths){

        if(!paths || paths.length <= 0) return;

        var 
            file = paths[0],
            args = NSArray.arrayWithObjects("-F", "folder=" + auth.images.folder, "-F", "tags=" + auth.images.tags, "-F", "api_key=" + auth.images.api_key, "-F", "timestamp=" + auth.images.timestamp,  "-F", "signature=" + auth.images.signature, "-F", "file=@" + file, UPLOAD_URL, nil);
        
        wo.ui.notify("Uploading export...");

        var result = wo.utils.runTask("/usr/bin/curl", args);

        if(!result || !result.secure_url) return null;

        return result.secure_url;
    };


    //Do the token things

    this.tokenPrompt = function() {
        var tokenString = wo.ui.prompt("You can find it here:\n https://www.workingon.co/tools#sketch", {
            title: "What's your WorkingOn API token?", 
            buttons: ["Save", "Cancel"]
        });

        wo.utils.debug("tokenString:"+tokenString);

        if(tokenString[0]) tokenString = tokenString[1];
        else tokenString = null;

        if(!tokenString) return;

        var token = new wo.token(tokenString, TOKEN_PATH, API_URL);

        if(!token.verify()){
            wo.ui.notify(token.validationError().message);
            return false;
        }

        wo.ui.notify(token.successMessage());
        token.save();
    };

    this.readToken = function() {
    
        var token = new wo.token();

        var tokenString = token.get(TOKEN_PATH);

        if(!token.verify(API_URL)) {
            wo.ui.notify("No active token found.")
            return false;
        }

        return token.string();
    };


    return this;
}();



