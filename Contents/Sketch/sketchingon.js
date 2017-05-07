var wo = wo || {};

@import 'lib/wo.main.js';

wo.utils.debug("Starting SketchingOn.");

function shareWork(context){

    var doc = context.document; 
    var selection = context.selection;

    wo.sketch.setContext(context);

    
    if (!wo.sketch.readToken()) {
        
        wo.sketch.tokenPrompt()

    } else {

        wo.sketch.workit(doc);
        
    }
}

function updateToken(context) {
     
    var doc = context.document; 
    var selection = context.selection;

    wo.sketch.setContext(context);
    
    wo.sketch.tokenPrompt();

}