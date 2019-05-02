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




 - (void)setup:(CDVInvokedUrlCommand*)command
    {
    
        CDVPluginResult* pluginResult = nil;
        NSString* myarg = [command.arguments objectAtIndex:0];

        @try {
            NSMutableDictionary* settings = [[NSMutableDictionary alloc] init];
            [settings setObject: [myarg valueForKey :@"base_url" ] forKey:@"base_url"];
            [settings setObject:[myarg valueForKey :@"code" ] forKey:@"code"];
            [settings setObject:[myarg valueForKey :@"secret_key" ] forKey:@"secret_key"];
            [settings setObject:[myarg valueForKey :@"dev_mode" ] forKey:@"dev_mode"];
            [settings setObject:[NSNumber numberWithInt:UIStatusBarStyleDefault] forKey:@"bar_style"];
            [settings setObject:[UIColor colorWithRed:0.2 green:1 blue:1 alpha:1] forKey:@"back_color"];
            [[NSR sharedInstance] setup:settings];
            
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        }
        @catch (NSException * e) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Arg was null"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        
        
    }

 - (void)setWorkflowDelegate:(CDVInvokedUrlCommand*)command {
 
     self.delegate = [[NSRSampleWFDelegate alloc] init];
   [[NSR sharedInstance] setWorkflowDelegate:self.delegate];

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
    [[NSR sharedInstance] showApp];
}

- (void)sendEvent:(CDVInvokedUrlCommand*)command
{
	@try{
    NSString* myarg = [command.arguments objectAtIndex:0];
    //[payload setObject:latitude forKey:[myarg valueForKey :@"latitude" ]];
    //[payload setObject:longitude forKey:@"longitude"];
    }
	@catch (NSException * e) {
	    NSLog(@"Exception: %@", e);
	 }
    NSMutableDictionary* payload = [[NSMutableDictionary alloc] init];
    [[NSR sharedInstance] sendEvent:@"position" payload:payload];
}
@end

