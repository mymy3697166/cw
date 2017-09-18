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

@implementation CWToast {
  UIImageView *iconImage;
  UILabel *msgLabel;
}

- (instancetype)init {
  self = [super init];
  if (!toastView) {
    CGFloat width = [UIScreen mainScreen].bounds.size.width;
    toastView = [[UIView alloc] initWithFrame:CGRectMake(0, -80, width, 80)];
    toastView.backgroundColor = UIColor.whiteColor;
    
    iconImage = [[UIImageView alloc] initWithFrame:CGRectMake(16, 46, 24, 24)];
    
    msgLabel = [[UILabel alloc] initWithFrame:CGRectMake(56, 46, width - 72, 24)];
    msgLabel.numberOfLines = 2;
    msgLabel.font = [UIFont systemFontOfSize:14];
    
    [toastView addSubview:iconImage];
    [toastView addSubview:msgLabel];
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

- (void)hide {
  [UIView animateWithDuration:0.4 animations:^{
    toastView.frame = CGRectMake(0, -80, toastView.frame.size.width, 80);
  } completion:^(BOOL finished) {
    [toastView removeFromSuperview];
    
  }];
}

@end
