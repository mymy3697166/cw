//
//  CWFile.h
//  cw
//
//  Created by zjz on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CWFile : RCTEventEmitter<RCTBridgeModule, NSURLSessionDelegate, NSURLSessionDownloadDelegate>

@end
