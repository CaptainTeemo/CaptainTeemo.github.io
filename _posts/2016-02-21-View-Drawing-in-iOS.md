---
layout: post
title:  "View Drawing in iOS"
---

High-quality graphics are important part of an app's user interface. Providing high-quality graphics not only makes app look good, but also makes app look like a natural extension to the rest of the system.
iOS privides two primary paths for creating high-quality graphics in your system: OpenGL or native rendering using Quartz, Core Animation and UIKit.

### The View Drawing Cycle

The `UIView` and its subclasses use `drawRect:` method to draw. When a view becomes visible for the first time or a portion of the view needs to be redrawn, `UIKit` will call `drawRect:` automatically, passes a rectangle as parameter which contains view's entire visible area. During subsequent calls the rectangle include only the portion of the view that actually needs to be redrawn.

The following actions can also trigger a view update:
- Moving or removing another view that was partially obscuring a view
- Making a previously hidden view visible again by setting its hidden property to false
- Scrolling a view off of the screen and then back onto the screen
- Explicitly calling the setNeedsDisplay or setNeedsDisplayInRect: method of you view

After call `drawRect:` method, the view marks itself as updated and waits for new actions to arrive and trigger another update cycle.

##### Note:
- *For maximum performance, you should redraw only affected content.*

- *Do not call your view’s drawRect: method yourself. That method should be called only by code built into iOS during a screen repaint. At other times, no graphics context exists, so drawing is not possible.*

The following example shows how to draw a circle using Core Graphics:

```swift
import UIKit

class CircleView: UIView {
    override func drawRect(rect: CGRect) {
        let context = UIGraphicsGetCurrentContext()
        CGContextAddArc(context, rect.width / 2, rect.height / 2, rect.width / 2, 0, CGFloat(M_PI * 2), 1)
        CGContextSetFillColorWithColor(context, UIColor.redColor().CGColor)
        CGContextFillPath(context)
    }
}

let view = CircleView(frame: CGRect(x: 0, y: 0, width: 100, height: 100))
```

The code above runs like in Playground:

![alt tag](https://raw.github.com/CaptainTeemo/CaptainTeemo.github.io/master/assets/images/CircleView.png)



Reference: [iOS Drawing Concepts](https://developer.apple.com/library/ios/documentation/2DDrawing/Conceptual/DrawingPrintingiOS/GraphicsDrawingOverview/GraphicsDrawingOverview.html#//apple_ref/doc/uid/TP40010156-CH14-SW2)
