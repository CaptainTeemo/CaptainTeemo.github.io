---
layout: post
category : Learning from books
title:  "Swifty GCD"
---


**Stolen from [NSHipster](nshipster.com)**

Tired of writting `dispatch_blahblahblahblah` when using [Grand Central Dispatch](https://developer.apple.com/library/ios/documentation/Performance/Reference/GCD_libdispatch_Ref/)?

Swift offers us a powerful `enum` to make it easy.

```swift
protocol ExcutableQueue {
    var queue: dispatch_queue_t { get }
}

extension ExcutableQueue {
    func execute(closure: () -> Void) {
        dispatch_async(queue, closure)
    }
}

enum Queue: ExcutableQueue {
    case Main
    case UserInteractive
    case UserInitiated
    case Utility
    case Background

    var queue: dispatch_queue_t {
        switch self {
        case .Main:
            return dispatch_get_main_queue()
        case .UserInteractive:
            return dispatch_get_global_queue(QOS_CLASS_USER_INTERACTIVE, 0)
        case .UserInitiated:
            return dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0)
        case .Utility:
            return dispatch_get_global_queue(QOS_CLASS_UTILITY, 0)
        case .Background:
            return dispatch_get_global_queue(QOS_CLASS_BACKGROUND, 0)
        }
    }
}

enum SerialQueue: String, ExcutableQueue {
    case DownLoadImage = "myApp.SerialQueue.DownLoadImage"
    case UpLoadFile = "myApp.SerialQueue.UpLoadFile"

    var queue: dispatch_queue_t {
        return dispatch_queue_create(rawValue, DISPATCH_QUEUE_SERIAL)
    }
}
```

Then our life is getting easier right here right now!

```swift
Queue.UserInitiated.execute {
    // make request || download data

    Queue.Main.execute {
        // update UI
    }
}
```
