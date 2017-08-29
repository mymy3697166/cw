#import <React/RCTRootView.h>
#import <React/RCTRootViewDelegate.h>
#import "RCCCustomBarButtonItem.h"

@interface RCCCustomBarButtonItem () <RCTRootViewDelegate>

@property (nonnull, nonatomic, strong, readwrite) RCTRootView *reactView;

@end

@implementation RCCCustomBarButtonItem

- (instancetype)initWithComponentName:(NSString *)component passProps:(NSDictionary *)passProps bridge:(RCTBridge *)bridge target:(id)target action:(SEL)action {
  RCTRootView *reactView = [[RCTRootView alloc] initWithBridge:bridge moduleName:component initialProperties:passProps];
  self = [super initWithCustomView:reactView];
  if (self) {
    reactView.sizeFlexibility = RCTRootViewSizeFlexibilityWidthAndHeight;
    reactView.delegate = self;
    reactView.backgroundColor = [UIColor clearColor];
    [self setTarget:target];
    [self setAction:action];
  }
  return self;
}

- (void)rootViewDidChangeIntrinsicSize:(RCTRootView *)rootView {
    CGSize size = rootView.intrinsicContentSize;
    rootView.frame = CGRectMake(0, 0, size.width, size.height);
    self.width = size.width;
}

@end
