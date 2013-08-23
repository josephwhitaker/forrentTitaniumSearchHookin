/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"Z6nJlKyKPxF873Im7gYFps48rHuBNeZ1"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"NUf1DOQZm5HLVF0FxmnYgiedR9vR9BZ0"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"yZJajMnNN5W1x3GpuiPCFiGCuPxx6yRu"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"siRfGlrtDi3G3TUwBUhzRto9b9E6girU"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"zsIr4akpq4UxCibqqaHYG6hjonbs1kOV"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"KsqH1UXvmrGbKJdPzNq3cVSWQIRCZOXW"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

+ (NSDictionary*) launchUrl {
    static BOOL launched = NO;
    if (!launched) {
        launched = YES;
        return nil;
    } else { return nil;}
}
 
@end