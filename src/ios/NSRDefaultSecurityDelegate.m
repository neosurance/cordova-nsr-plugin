#import "NSRDefaultSecurityDelegate.h"

@implementation NSRDefaultSecurityDelegate

-(void)secureRequestOLD:(NSString*)endpoint payload:(NSDictionary*)payload headers:(NSDictionary*)headers completionHandler:(void (^)(NSDictionary* responseObject, NSError *error))completionHandler {
	NSString* url = [[[NSR sharedInstance] getSettings][@"base_url"] stringByAppendingFormat:@"%@", endpoint];
	NSRLog(@"%@", url);
    /*
     
    AFJSONRequestSerializer *serializer = [AFJSONRequestSerializer serializer];
	AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
	if(headers != nil) {
		for(NSString* key in [headers keyEnumerator]) {
			NSString* value = [headers objectForKey:key];
			[serializer setValue:value forHTTPHeaderField:key];
		}
	}
	[serializer setValue:@"application/json;charset=UTF-8" forHTTPHeaderField:@"Content-Type"];
	manager.requestSerializer = serializer;
	
	NSError *error;
	NSData *jsonData = [NSJSONSerialization dataWithJSONObject:(payload != nil ? payload : [[NSDictionary alloc] init]) options:0 error:&error];
	NSDictionary *parameters = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:&error];
	
	[manager POST:url parameters:parameters progress:nil success:^(NSURLSessionDataTask *task, id responseObject) {
		NSRLog(@"Response: %@", responseObject);
		completionHandler(responseObject, nil);
	} failure:^(NSURLSessionDataTask *task, NSError *error) {
		NSRLog(@"Error: %@", error);
		completionHandler(nil, error);
	}];
     */
}

-(void)secureRequest:(NSString*)endpoint payload:(NSDictionary*)payload headers:(NSDictionary*)headers completionHandler:(void (^)(NSDictionary* responseObject, NSError *error))completionHandlerX{
    
    NSLog(@"NSRDefaultSecurityDelegate.m --> secureRequest --> endpoint: %@",endpoint);
    
    NSDictionary* settings = [[NSR sharedInstance] getSettings];
    NSString* base_url = settings[@"base_url"];
    NSString* url = [base_url stringByAppendingFormat:@"%@", endpoint];
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:(payload != nil ? payload : [[NSDictionary alloc] init]) options:0 error:&error];
    NSString* jsonString =  [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    //NSLog(@"NSRDefaultSecurityDelegate.m --> secureRequestLight --> jsonStringRequest: %@", jsonString);
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json;charset=UTF-8" forHTTPHeaderField:@"Content-type"];
    [request setValue:[NSString stringWithFormat:@"%d", (int)[jsonString length]] forHTTPHeaderField:@"Content-length"];
    
    for(NSString* hKey in [headers allKeys])
        [request setValue:headers[hKey] forHTTPHeaderField:hKey];
    
    [request setHTTPBody:[jsonString dataUsingEncoding:NSUTF8StringEncoding]];
    
    NSLog(@"NSRDefaultSecurityDelegate.m --> secureRequest --> before sendAsynchronousRequest - jsonStringRequest: %@",jsonString);
    
    [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *error)
     {
         NSLog(@"sendAsynchronousRequest CallBack");
         
         NSInteger statusCode = -1;
         
         // to be safe, you should make sure `response` is `NSHTTPURLResponse`
         
         if ([response isKindOfClass:[NSHTTPURLResponse class]])
         {
             NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;
             statusCode = httpResponse.statusCode;
             
             id jsonResponseObject = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
             
             NSLog(@"sendAsynchronousRequest statusCode:%d - httpResponse.debugDescription: %@, jsonResponseObject: %@",(int)statusCode,httpResponse.debugDescription,jsonResponseObject);
         }
         
         if (error)
         {
             NSLog(@"sendAsynchronousRequest ERROR");
             completionHandlerX(nil, error);
         }
         
         if (error == nil && statusCode == 200)
         {
             NSLog(@"sendAsynchronousRequest SUCCESS");
             
             //NSString* jsonDataResponse =  [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
             
             id jsonResponseObject = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
             //NSDictionary* jsonResponseDictionary = (NSDictionary*) jsonResponseObject;
             
             completionHandlerX(jsonResponseObject, nil);
         }
     }];
    
}

@end
