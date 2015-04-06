#import 'lib/wo.utils.js'

var wo = wo || {};

wo.request = function(){

    this.get = function(url){

        var 
            request = NSURLRequest.requestWithURL(NSURL.URLWithString(url)),
            response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);

        return this.toJSON(response);

    };

    this.toJSON = function(response){

        var json;
        
        try {
            json = [NSJSONSerialization JSONObjectWithData:response options: nil error: nil]; 
        } catch (err) {
            wo.utils.debug(err);
            
            return false;
        }

        return {
            json: json,
            response: response
        };

    }

    //Data should be in query string format
    this.post = function(url, data){

        var 
            postBody = [NSString stringWithString:data],
            request = NSMutableURLRequest.requestWithURL(NSURL.URLWithString(url)),
            response;

        request.setHTTPMethod("POST");
        request.setHTTPBody([postBody dataUsingEncoding:NSUTF8StringEncoding]);

        response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);

        return this.toJSON(response);
    };

    return this;
}();