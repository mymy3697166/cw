//
//  CWToast.m
//  cw
//
//  Created by zjz on 2017/9/18.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CWToast.h"
#import <UIKit/UIKit.h>
#import <React/RCTConvert.h>

static UIView *toastView;
static UIView *loadingView;

@implementation CWToast {
  UIImageView *iconImage;
  UILabel *msgLabel;
  
  UIView *loadingBgView;
  UIActivityIndicatorView *indicator;
}

- (instancetype)init {
  self = [super init];
  CGFloat width = [UIScreen mainScreen].bounds.size.width;
  CGFloat height = [UIScreen mainScreen].bounds.size.height;
  if (!toastView) {
    toastView = [[UIView alloc] initWithFrame:CGRectMake(0, -80, width, 80)];
    toastView.backgroundColor = UIColor.whiteColor;
    toastView.layer.shadowColor = UIColor.blackColor.CGColor;
    toastView.layer.shadowOffset = CGSizeMake(0, 0);
    toastView.layer.shadowRadius = 5;
    toastView.layer.shadowOpacity = 0.5;
    
    iconImage = [[UIImageView alloc] initWithFrame:CGRectMake(16, 46, 24, 24)];
    
    msgLabel = [[UILabel alloc] initWithFrame:CGRectMake(56, 46, width - 72, 24)];
    msgLabel.numberOfLines = 2;
    msgLabel.font = [UIFont systemFontOfSize:14];
    
    [toastView addSubview:iconImage];
    [toastView addSubview:msgLabel];
  }
  if (!loadingView) {
    CGFloat lvw = 64, lvh = 64;
    loadingView = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
    loadingBgView = [[UIView alloc] initWithFrame:CGRectMake((width - lvw) / 2, (height - lvh) / 2, lvw, lvh)];
    loadingBgView.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.8];
    loadingBgView.layer.cornerRadius = 10;
    indicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    indicator.frame = CGRectMake((lvw - 37) / 2, (lvh - 37) / 2, 37, 37);
    [loadingBgView addSubview:indicator];
    [loadingView addSubview:loadingBgView];
  }
  return self;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(show:(NSString *)msg icon:(id)icon) {
  dispatch_sync(dispatch_get_main_queue(), ^{
    iconImage.image = [RCTConvert UIImage:icon];
    msgLabel.text = msg;
    [NSObject cancelPreviousPerformRequestsWithTarget:self];
    [toastView.layer removeAllAnimations];
    [[UIApplication sharedApplication].keyWindow addSubview:toastView];
    [UIView animateWithDuration:0.4 delay:0 usingSpringWithDamping:0.5 initialSpringVelocity:1 options:UIViewAnimationOptionCurveLinear animations:^{
      toastView.frame = CGRectMake(0, -16, toastView.frame.size.width, 80);
    } completion:^(BOOL finished) {
      [self performSelector:@selector(hide) withObject:nil afterDelay:2];
    }];
  });
}

RCT_EXPORT_METHOD(showLoading) {
  dispatch_sync(dispatch_get_main_queue(), ^{
    [indicator startAnimating];
    [[UIApplication sharedApplication].keyWindow addSubview:loadingView];
  });
}

RCT_EXPORT_METHOD(hideLoading) {
  dispatch_sync(dispatch_get_main_queue(), ^{
    [indicator stopAnimating];
    [loadingView removeFromSuperview];
  });
}

- (void)hide {
  [UIView animateWithDuration:0.4 animations:^{
    toastView.frame = CGRectMake(0, -80, toastView.frame.size.width, 80);
  } completion:^(BOOL finished) {
    if (finished) [toastView removeFromSuperview];
  }];
}

@end
