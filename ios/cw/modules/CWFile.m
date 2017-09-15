//
//  CWFile.m
//  cw
//
//  Created by zjz on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CWFile.h"
#import <CommonCrypto/CommonDigest.h>

@implementation CWFile
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(download:(NSString *)uri) {
  NSURL *url = [NSURL URLWithString:uri];
  NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:nil];
  NSURLSessionDownloadTask *task = [session downloadTaskWithURL:url];
  [task resume];
}

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite {
  NSNumber *progress = [NSNumber numberWithFloat:(float)totalBytesWritten / (float)totalBytesExpectedToWrite];
  NSString *uri = downloadTask.currentRequest.URL.absoluteString;
  [self sendEventWithName:@"DownloadProgress" body:@{@"uri": uri, @"progress": progress}];
}

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location {
  NSFileManager *fm = [NSFileManager defaultManager];
  NSString *fd = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0] stringByAppendingPathComponent:@"cache"];
  if (![fm fileExistsAtPath:fd]) [fm createDirectoryAtPath:fd withIntermediateDirectories:YES attributes:nil error:nil];
  NSString *fn = [NSString stringWithFormat:@"%@.jpg", [self md5:downloadTask.currentRequest.URL.absoluteString]];
  NSString *fp = [fd stringByAppendingPathComponent:fn];
  NSData *data = [NSData dataWithContentsOfURL:location];
  [data writeToFile:fp atomically:YES];
  NSString *uri = downloadTask.currentRequest.URL.absoluteString;
  [self sendEventWithName:@"DownloadFinish" body:@{@"uri": uri, @"file": fp}];
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error {
  NSMutableDictionary *body = [NSMutableDictionary dictionaryWithDictionary:error.userInfo];
  NSString *uri = task.currentRequest.URL.absoluteString;
  [body setObject:uri forKey:@"uri"];
  [self sendEventWithName:@"DownloadError" body:body];
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

- (NSArray<NSString *> *)supportedEvents {
  return @[@"DownloadProgress", @"DownloadFinish", @"DownloadError"];
}
@end
