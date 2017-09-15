//
//  CWCircleProgress.m
//  cw
//
//  Created by zjz on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CWDownloadViewManager.h"

@interface DownloadView : UIView
@property (strong, nonatomic) NSString* uri;
@end

@implementation DownloadView {
  UILabel *label;
}

- (instancetype)init {
  self = [super init];
  label = [[UILabel alloc] init];
  label.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.5];
  label.textColor = UIColor.whiteColor;
  label.font = [UIFont systemFontOfSize:12];
  label.layer.masksToBounds = YES;
  label.textAlignment = NSTextAlignmentCenter;
  label.text = @"74%";
  [self addSubview:label];
  return self;
}

- (void)setUri:(NSString *)uri

- (void)drawRect:(CGRect)rect {
  CGFloat r = rect.size.width / 2;
  CGPoint cp = CGPointMake(r, r);
  
  label.frame = rect;
  label.layer.cornerRadius = r;
  
  CAShapeLayer *bgLayer = [[CAShapeLayer alloc] init];
  bgLayer.frame = rect;
  bgLayer.fillColor = UIColor.clearColor.CGColor;
  bgLayer.strokeColor = UIColor.whiteColor.CGColor;
  bgLayer.lineCap = kCALineCapRound;
  bgLayer.lineWidth = 3;
  UIBezierPath *path = [UIBezierPath bezierPathWithArcCenter:cp radius:r startAngle:-M_PI_2 endAngle:M_PI_2 * 2 clockwise:YES];
  bgLayer.path = path.CGPath;
  [self.layer addSublayer:bgLayer];
}

@end

@implementation CWDownloadViewManager
RCT_EXPORT_MODULE()

- (UIView *)view {
  return [[CWDownloadView alloc] init];
}
@end
