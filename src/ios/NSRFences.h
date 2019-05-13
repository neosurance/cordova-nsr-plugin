#import <WebKit/WebKit.h>

@interface NSRFences : NSObject

- (void)initFence;
- (void)traceFence;
- (void)stopTraceFence;
- (NSMutableArray*)getFences;
- (void)setFences(NSMutableArray*);
- (void)activateFences(NSMutableArray*);
- (void)removeFences;

@end
