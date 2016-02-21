---
layout: post
title:  "View Drawing in iOS"
---

High-quality graphics are important part of an app's user interface. Providing high-quality graphics not only makes app look good, but also makes app look like a natural extension to the rest of the system.
iOS privides two primary paths for creating high-quality graphics in your system: OpenGL or native rendering using Quartz, Core Animation and UIKit.

### The View Drawing Cycle

The `UIView` and its subclasses use `drawRect:` method to draw. When a view becomes visible for the first time or a portion of the view needs to be redrawn, `UIKit` will call `drawRect:` automatically, passes a rectangle as parameter which contains view's entire visible area. During subsequent calls the rectangle include only the portion of the view that actually needs to be redrawn.

Reference: [iOS Drawing Concepts](https://developer.apple.com/library/ios/documentation/2DDrawing/Conceptual/DrawingPrintingiOS/GraphicsDrawingOverview/GraphicsDrawingOverview.html#//apple_ref/doc/uid/TP40010156-CH14-SW2)
