---
layout: post
category : Objective-C
title:  "Automatic Bounds Checking for NSArray"
---

Reasons crashing an app could be varied, but there's one really annoying is something like:

>*** Terminating app due to uncaught exception 'NSRangeException', reason: '*** -[__NSArrayI objectAtIndex:]: index i beyond bounds [0 .. i - 1]'

><img src='/assets/images/nickyoung.jpg' style='width:30%'>


### Excuse me?

One might say, why don't you do `bounds checking` every time you need to access an array by index?

Well, that's ok, totally ok.

So that's all, end of story.

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<img src='/assets/images/a-man.jpg' style='width:40%'>

**A man must figure out an awesome way to do bounds checking.**

The **basic idea** is check if that index is greater or equal than array size or not when accessing value by index. If so, return nil.

As for `NSArray`, we use `[NSArray objectAtIndex:]` or `NSArray[index]` to work, bounds checking should be done in these two methods apparently.

The **inheritance approaching** was banned at a very first moment, a man cannot break existence code structure when adding new features.

Then here comes the choice: `extension(aka category)`.

### First Try

A man creates an extension which uses runtime functions to swizzle `objectAtIndex:`, and do bounds checking before returning the value.

```objc
@interface NSArray<ObjectType> (BoundsChecking)
@end

@implementation NSArray (BoundsChecking)
+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [NSArray replaceSelector:@selector(objectAtIndex:) withNew:@selector(ex_objectAtIndex:)];
    });
}

+ (void)replaceSelector:(SEL)selector withNew:(SEL)newSelector {
    Method original = class_getInstanceMethod([self class], selector);
    Method swizzled = class_getInstanceMethod([self class], newSelector);

    method_exchangeImplementations(original, swizzled);
}

- (id)ex_objectAtIndex:(NSUInteger)index {
    if (index >= self.count) {
        return nil;
    }
    return [self ex_objectAtIndex:index];
}

@end
```

A man also wrote a test

```objc
    NSArray *array = @[@1, @2, @3, @4, @5];
    NSLog(@"%@", array[0]);
    NSLog(@"%@", array[5]);
```

cmd + R

Oops, an exception has been thrown!

It said `[NSArray objectAtIndex:] method only defined for abstract class`.

What the problem here is that `NSArray` is a kind of so called `Class Cluster`, swizzle or override methods in primitive class should be atomic, which means override them all or none.

### Try Again

Since primitive class methods cannot be overridden in `NSArray`, is there any chance to override one in an extension?

From to [Apple's Document](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/CustomizingExistingClasses/CustomizingExistingClasses.html#//apple_ref/doc/uid/TP40011210-CH6-SW4)

>Because the methods declared in a category are added to an existing class, you need to be very careful about method names.

>**If the name of a method declared in a category is the same as a method in the original class, or a method in another category on the same class (or even a superclass), the behavior is undefined as to which method implementation is used at runtime.** This is less likely to be an issue if you’re using categories with your own classes, but can cause problems when using categories to add methods to standard Cocoa or Cocoa Touch classes.

So the answer is **better not**.

### Finally

A man has never given up.

After browsing the header of `NSArray` for a little while, there is a method called `objectAtIndexedSubscript:`, and it's in another extension.

Well, this is the one.

Since the method `objectAtIndex:` in primitive class could not be overridden, a man has to create a another one let's call it `tryGetObjectAtIndex:` instead, and fill with the bounds checking logic.

```objc
- (id)tryGetObjectAtIndex:(NSUInteger)index {
    if (index >= self.count) {
        return nil;
    }
    return [self objectAtIndex:index];
}
```

So the final code is

```objc
@interface NSArray<ObjectType> (BoundsChecking)
- (nullable ObjectType)tryGetObjectAtIndex:(NSUInteger)index;
@end

@implementation NSArray (BoundsChecking)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [NSArray replaceSelector:@selector(objectAtIndexedSubscript:) withNew:@selector(ex_objectAtIndexedSubscript:)];
    });
}

+ (void)replaceSelector:(SEL)selector withNew:(SEL)newSelector {
    Method original = class_getInstanceMethod([self class], selector);
    Method swizzled = class_getInstanceMethod([self class], newSelector);

    method_exchangeImplementations(original, swizzled);
}

- (id)tryGetObjectAtIndex:(NSUInteger)index {
    if (index >= self.count) {
        return nil;
    }
    return [self objectAtIndex:index];
}

- (id)ex_objectAtIndexedSubscript:(NSUInteger)index {
    return [self tryGetObjectAtIndex:index];
}

@end
```

>Note that only the literal approaching added bounds checking, for `objectAtIndex:`, replace it with literal style or use `tryGetObjectAtIndex:`

Now let's run the test:

```objc
1
(null)
```

No more crashes.
