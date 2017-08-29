//
//  RCCTabBar.m
//  ReactNativeNavigation
//
//  Created by zjz on 2017/8/29.
//  Copyright © 2017年 artal. All rights reserved.
//

#import "RCCTabBar.h"

@implementation RCCTabBar {
  UIButton *centerBtn;
}

- (instancetype)initWithCenterButton:(UIButton *)button {
  self = [super init];
  [self setBackgroundImage:[UIImage new]];
  [self setShadowImage:[UIImage new]];
  self.layer.shadowColor = UIColor.blackColor.CGColor;
  self.layer.shadowOffset = CGSizeMake(0, 0);
  self.layer.shadowRadius = 2;
  self.layer.shadowOpacity = 0.2;
  
  centerBtn = button;
  [self addSubview:centerBtn];
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  // 设置中部按钮的位置
  CGFloat btnW = centerBtn.bounds.size.width;
  centerBtn.frame = CGRectMake((self.bounds.size.width - btnW) / 2, -btnW / 2 + 10, btnW, btnW);
  // 改变原始按钮的位置
  int index = 0;
  CGFloat width = self.bounds.size.width / (self.items.count + 1);
  for (UIView *item in self.subviews) {
    if ([item isKindOfClass:NSClassFromString(@"UITabBarButton")]) {
      item.frame = CGRectMake(index * width, 0, width, self.bounds.size.height);
      index++;
      if (index == (self.items.count / 2)) index++;
    }
  }
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event {
  if (self.isHidden) return [super hitTest:point withEvent:event];
  CGPoint newP = [self convertPoint:point toView:centerBtn];
  if ([centerBtn pointInside:newP withEvent:event]) return centerBtn;
  else return [super hitTest:point withEvent:event];
}
@end
