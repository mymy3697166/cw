//
//  CWCircleProgress.m
//  cw
//
//  Created by zjz on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CWLoader.h"
#import <React/RCTUIManager.h>
#import <CommonCrypto/CommonDigest.h>

@interface LoadingView : UIView<CAAnimationDelegate, NSURLSessionTaskDelegate>
@property (strong, nonatomic) RCTBubblingEventBlock onLoadFinish;
@property (strong, nonatomic) RCTBubblingEventBlock onLoadError;

- (void)download:(NSString *)uri;
@end
@implementation LoadingView {
  UILabel *label;
  CAShapeLayer *bgLayer;
  NSNumber *startAngle;
  BOOL isLoad;
  BOOL isFinish;
}

- (instancetype)init {
  self = [super init];
  
  label = [[UILabel alloc] init];
  label.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.5];
  label.textColor = UIColor.whiteColor;
  label.font = [UIFont systemFontOfSize:12];
  label.layer.masksToBounds = YES;
  label.textAlignment = NSTextAlignmentCenter;
  label.text = @"0%";
  [self addSubview:label];
  
  bgLayer = [[CAShapeLayer alloc] init];
  bgLayer.fillColor = UIColor.clearColor.CGColor;
  bgLayer.strokeColor = UIColor.whiteColor.CGColor;
  bgLayer.lineCap = kCALineCapRound;
  bgLayer.lineWidth = 3;
  bgLayer.strokeStart = 0;
  bgLayer.strokeEnd = 0;
  [self.layer addSublayer:bgLayer];
  
  startAngle = @0;
  isLoad = NO;
  isFinish = NO;
  
  return self;
}

- (void)drawRect:(CGRect)rect {
  if (!isLoad) self.hidden = YES;
  CGFloat r = rect.size.width / 2;
  CGPoint cp = CGPointMake(r, r);
  
  label.frame = rect;
  label.layer.cornerRadius = r;
  
  bgLayer.frame = rect;
  bgLayer.path = [UIBezierPath bezierPathWithArcCenter:cp radius:r startAngle:-M_PI_2 endAngle:M_PI_2 * 3 clockwise:YES].CGPath;
}

- (void)download:(NSString *)uri {
  NSFileManager *fm = [NSFileManager defaultManager];
  NSString *fd = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0] stringByAppendingPathComponent:@"cache"];
  if (![fm fileExistsAtPath:fd]) [fm createDirectoryAtPath:fd withIntermediateDirectories:YES attributes:nil error:nil];
  NSString *fn = [NSString stringWithFormat:@"%@.jpg", [self md5:uri.lowercaseString]];
  NSString *fp = [fd stringByAppendingPathComponent:fn];
  if ([fm fileExistsAtPath:fp]) {
    if (_onLoadFinish) _onLoadFinish(@{@"uri": fp});
    return;
  }
  isLoad = YES;
  self.hidden = NO;
  NSURL *url = [NSURL URLWithString:uri];
  NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:nil];
  NSURLSessionDownloadTask *task = [session downloadTaskWithURL:url];
  [task resume];
}

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite {
  NSNumber *progress = [NSNumber numberWithFloat:(float)totalBytesWritten / (float)totalBytesExpectedToWrite];
  CABasicAnimation *animation = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
  animation.fromValue = startAngle;
  animation.toValue = progress;
  animation.removedOnCompletion = NO;
  animation.fillMode = kCAFillModeForwards;
  animation.speed = 1;
  animation.delegate = self;
  animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionLinear];
  dispatch_sync(dispatch_get_main_queue(), ^{
    label.text = [NSString stringWithFormat:@"%d%%", (int)roundf([progress floatValue] * 100)];
    [bgLayer addAnimation:animation forKey:nil];
  });
  startAngle = progress;
}

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location {
  NSFileManager *fm = [NSFileManager defaultManager];
  NSString *fd = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0] stringByAppendingPathComponent:@"cache"];
  if (![fm fileExistsAtPath:fd]) [fm createDirectoryAtPath:fd withIntermediateDirectories:YES attributes:nil error:nil];
  NSString *fn = [NSString stringWithFormat:@"%@.jpg", [self md5:downloadTask.currentRequest.URL.absoluteString]];
  NSString *fp = [fd stringByAppendingPathComponent:fn];
  NSData *data = [NSData dataWithContentsOfURL:location];
  [data writeToFile:fp atomically:YES];
  if (_onLoadFinish) _onLoadFinish(@{@"uri": fp});
  isFinish = YES;
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error {
  if (error && _onLoadError) _onLoadError(error.userInfo);
}

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
  if (isFinish) {
    self.hidden = YES;
  }
}

- (NSString *)md5:(NSString *)source {
  const char *cStr = [source UTF8String];
  unsigned char result[CC_MD5_DIGEST_LENGTH];
  CC_MD5(cStr, (CC_LONG)strlen(cStr), result);
  NSMutableString *res = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH];
  for (int i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
    [res appendFormat:@"%02X", result[i]];
  }
  return res;
}

@end

@implementation CWLoader {
  LoadingView *loadingView;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onLoadFinish, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadError, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(clear) {
  NSFileManager *fm = [NSFileManager defaultManager];
  NSString *fd = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0] stringByAppendingPathComponent:@"cache"];
  NSArray *subpaths = [fm subpathsAtPath:fd];
  [subpaths enumerateObjectsUsingBlock:^(NSString *item, NSUInteger idx, BOOL *stop) {
    [fm removeItemAtPath:[fd stringByAppendingPathComponent:item] error:nil];
  }];
}

RCT_EXPORT_METHOD(download:(NSString *)uri reactTag:(nonnull NSNumber *)tag) {
  dispatch_sync(dispatch_get_main_queue(), ^{
    LoadingView *view = (LoadingView *)[self.bridge.uiManager viewForReactTag:tag];
    [view download:uri];
  });
}

- (UIView *)view {
  return [[LoadingView alloc] init];
}
@end
