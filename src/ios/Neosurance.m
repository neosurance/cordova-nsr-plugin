/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#include <sys/types.h>
#include <sys/sysctl.h>
#include "TargetConditionals.h"

#import <Cordova/CDV.h>
#import "Neosurance.h"


@interface Neosurance () {}
@end

@implementation Neosurance


- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler   API_AVAILABLE(ios(10.0)){
    completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionSound);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)(void))completionHandler   API_AVAILABLE(ios(10.0)){
    if(![[NSR sharedInstance] forwardNotification:response]) {
    }
    completionHandler();
}

 - (void)setup:(CDVInvokedUrlCommand*)command
    {

        CDVPluginResult* pluginResult = nil;
        NSString* myarg = [command.arguments objectAtIndex:0];

        if (@available(iOS 10.0, *)) {
            UNUserNotificationCenter* center = [UNUserNotificationCenter currentNotificationCenter];
            center.delegate = self;

            UNAuthorizationOptions options = UNAuthorizationOptionAlert | UNAuthorizationOptionSound;
            [center requestAuthorizationWithOptions:options completionHandler:^(BOOL granted, NSError* _Nullable error) {}];

        }

        @try {
            NSMutableDictionary* settings = [[NSMutableDictionary alloc] init];

            NSString* baseUrl = [myarg valueForKey :@"base_url"];
            NSString* code = [myarg valueForKey :@"code"];
            NSString* secret_key = [myarg valueForKey :@"secret_key"];
            NSString* dev_mode = [myarg valueForKey :@"dev_mode"];
            [settings setObject:baseUrl  forKey:@"base_url"];
            [settings setObject:code forKey:@"code"];
            [settings setObject:secret_key forKey:@"secret_key"];
            [settings setObject:dev_mode forKey:@"dev_mode"];

            [settings setObject:[NSNumber numberWithInt:UIStatusBarStyleDefault] forKey:@"bar_style"];
            [settings setObject:[UIColor colorWithRed:0.2 green:1 blue:1 alpha:1] forKey:@"back_color"];
            id res = [NSR sharedInstance];
            [res setup:settings];

            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        }
        @catch (NSException * e) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Arg was null"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];


    }

 - (void)setWorkflowDelegate:(CDVInvokedUrlCommand*)command {

     CDVPluginResult* pluginResult = nil;
     self.delegate = [[NSRSampleWFDelegate alloc] init];

     if(self.delegate != nil){
         [[NSR sharedInstance] setWorkflowDelegate:self.delegate];
         pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
         if(command.callbackId != nil)
             [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }else{
         pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
         if(command.callbackId != nil)
             [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }

 }

 - (void)registerUser:(CDVInvokedUrlCommand*)command
    {

        CDVPluginResult* pluginResult = nil;
        NSString* myarg = [command.arguments objectAtIndex:0];

        @try {

            NSRUser* user = [[NSRUser alloc] init];
			user.email = [myarg valueForKey :@"email" ];
			user.code = [myarg valueForKey :@"code" ];
			user.firstname = [myarg valueForKey :@"firstname" ];
			user.lastname = [myarg valueForKey :@"lastname" ];

            user.mobile = [myarg valueForKey :@"mobile" ];
            user.fiscalCode = [myarg valueForKey :@"fiscalCode" ];
            user.gender = [myarg valueForKey :@"gender" ];
            user.birthday = [myarg valueForKey :@"birthday" ];
            user.address = [myarg valueForKey :@"address" ];
            user.zipCode = [myarg valueForKey :@"zipCode" ];
            user.city = [myarg valueForKey :@"city" ];
            user.stateProvince = [myarg valueForKey :@"stateProvince" ];
            user.country = [myarg valueForKey :@"country" ];
            user.extra = [myarg valueForKey :@"extra" ];
            user.locals = [myarg valueForKey :@"locals" ];

			[[NSR sharedInstance] registerUser:user];

            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        }
        @catch (NSException * e) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Arg was null"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];


    }

- (void)forgetUser:(CDVInvokedUrlCommand*)command
{
    [[NSR sharedInstance] forgetUser];
}

- (void)showApp:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    if([[NSR sharedInstance] getAppUrl] != nil){
        [[NSR sharedInstance] showApp];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        if(command.callbackId != nil)
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        if(command.callbackId != nil)
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }

}

- (void)sendEvent:(CDVInvokedUrlCommand*)command
{

    CDVPluginResult* pluginResult = nil;
    NSString* myarg = nil;
	@try{

        myarg = [command.arguments objectAtIndex:0];
    }
	@catch (NSException * e) {
	    NSLog(@"Exception: %@", e);
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Arg was null"];
	 }

    //NSMutableDictionary* payload = [[NSMutableDictionary alloc] init];
    NSString* event = [myarg valueForKey :@"event" ];
    NSMutableDictionary* payloadTmp = [myarg valueForKey :@"payload" ];

    [[NSR sharedInstance] sendEvent:event payload:payloadTmp];

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

- (void)postMessage:(CDVInvokedUrlCommand*)command
{

    NSString* arg = [command.arguments objectAtIndex:0];
    NSData* argData = [arg dataUsingEncoding:(NSUTF8StringEncoding)];
    NSMutableDictionary* json = [NSJSONSerialization JSONObjectWithData:argData options:0 error:NULL];

    NSString* val = [json valueForKey :@"what" ];
    NSString* val1 = [json valueForKey :@"endpoint" ];

    NSMutableDictionary* payload = [[NSMutableDictionary alloc] init];
    [payload setObject:val forKey:@"what" ];
    [payload setObject:val1 forKey:@"endpoint" ];


    [[NSR sharedInstance] sendEvent:val payload:payload];
}

- (void)login:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    if(command.callbackId != nil){
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:command.callbackId];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        if(command.callbackId != nil)
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)appLogin:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    NSString* arg = [command.arguments objectAtIndex:0];
    NSString* url = [arg valueForKey :@"url" ];

    if(url.length > 0){
        [[NSR sharedInstance] loginExecuted:url];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        if(command.callbackId != nil)
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        if(command.callbackId != nil)
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)appPayment:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    if(command.callbackId != nil){
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:command.callbackId];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        if(command.callbackId != nil)
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)appPaymentExecuted:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    NSString* arg = [command.arguments objectAtIndex:0];
    NSString* payment = [arg valueForKey :@"payment" ];
    NSString* paymentUrl = [arg valueForKey :@"paymentUrl" ];

    if(payment != nil && paymentUrl != nil && paymentUrl.length > 0){

        NSMutableDictionary* paymentDict = [[NSMutableDictionary alloc] init];
        [paymentDict setObject:payment  forKey:@"payment"];
        [paymentDict setObject:paymentUrl  forKey:@"paymentUrl"];
        [[NSR sharedInstance] paymentExecuted:paymentDict url:paymentUrl];

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        if(command.callbackId != nil)
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

    }else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        if(command.callbackId != nil)
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }

}

@end

