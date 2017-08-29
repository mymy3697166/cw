#import <UIKit/UIKit.h>

@class RCTRootView;
@class RCTBridge;

@interface RCCCustomBarButtonItem : UIBarButtonItem

@property (nonnull, nonatomic, strong, readonly) RCTRootView *reactView;

- (__nonnull instancetype)initWithComponentName:(NSString *__nonnull)component
                                      passProps:(NSDictionary *__nullable)passProps
                                         bridge:(RCTBridge *__nonnull)bridge
                                         target:(id __nullable)target
                                         action:(SEL __nullable)action;

@end
