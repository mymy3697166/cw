//
//  CWNotification.m
//  cw
//
//  Created by zjz on 2017/10/9.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CWNotification.h"

@implementation CWNotification {
  NSMutableArray *events;
}
- (instancetype)init {
  events = [NSMutableArray array];
  self = [super init];
  return self;
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(registerEvent, name:(NSString *)name resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (![events containsObject:name]) [events addObject:name];
  resolve(nil);
}

RCT_REMAP_METHOD(broadcast, name:(NSString *)name info:(id)info) {
  if (![events containsObject:name]) return;
  [self sendEventWithName:name body:info];
}

- (NSArray<NSString *> *)supportedEvents {
  return events;
}
@end
