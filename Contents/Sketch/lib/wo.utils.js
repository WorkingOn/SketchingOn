var wo = wo || {};

var DEBUG = false, PREFIX = "wo.sketch";

wo.utils = function(){

    this.debug = function(message){
        if(DEBUG) {
            log(PREFIX + ": " + message)
        }
    };

    this.runTask = function(commandPath, args){

        var 
            task = NSTask.alloc().init(), 
            outputPipe = [NSPipe pipe],
            outputData;

        task.setArguments(args);
        task.setLaunchPath(commandPath);
        
        [task setStandardInput:[NSPipe pipe]];
        [task setStandardOutput:outputPipe];

        task.launch(); 
        task.waitUntilExit();

        outputData = [[outputPipe fileHandleForReading] readDataToEndOfFile];

        if(!outputData) return null;
        
        return [NSJSONSerialization JSONObjectWithData:outputData options: nil error: nil];
    };

    return this;
}();