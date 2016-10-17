---
layout: post
category : Notes
title:  "Generic and Protocol Types Under the Hood"
---

### Protocol Types

**Polymorphism without inheritance or reference semantics**

Let's say we have some shapes and each one of them has its own drawing behavior.

So we declare a protocol.

```swift
protocol Drawable { func draw() }

struct Point: Drawable {
	var x, y: Double
	func draw() { ... }
}

struct Line: Drawable {
	var x1, y1, x2, y2: Double
	func draw() { ... }
}
```

For every struct or class who conformed to `Drawable` we could directly call that draw function.

Now consider there is a class called SharedLine which also comformed to `Drawable`.

```swift
class SharedLine: Drawable {
	var x1, y1, x2, y2: Double
	func draw() { ... }
}
```

Here is the idea: What if we put all theses shapes into an array?

```swift
let drawables: [Drawable] = [somePoint, someLine, someSharedLine]
for d in drawables {
	d.draw()
}
```
We could store both values of types Point and of type Line in our array of drawable protocol type.

<img src="/assets/images/Dynamic dispatch without a V-Table.png">

Note that our value type struct Line and struct Point don't share a common inheritance relationship necessary to do V-Table dispatch.

So, how does Swift dispatch to the correct method?

There's a table based mechanism called `Protocol Witness Table`.

<img src="/assets/images/Protocol Witness Table.png">

And there's one of those tables per type that implements the protocol.

Wait a second, our Line and Point are value types, which needs four words and two. So they don't have the same size, how does our array store its elements uniformly at fixed offsets?

<img src="/assets/images/Store Values Uniformly.png">

Swift uses a special storage layout called the `Existential Container`.
The first three words in that existential container are reserved for the valueBuffer. Small types like our Point, which only needs two words, fit into this valueBuffer.
For large values like our Line are stored on heap. In this case, Swift allocates memory on the heap and stores the value there and stores a pointer to that memory in the `Existential Container`.

This `Existential Container` uses the `Value Witness Table` manages the lifetime of our value and there is one of those tables per type.

[More about Witness Tables](https://github.com/apple/swift/blob/master/docs/SIL.rst#vtables)

Here is how it works:

1. Swift calls the allocate function inside of that table.
2. Since we have a `Line Witness Table` here, this function will allocate the memory on the heap and store a pointer to that memory inside of the valueBuffer of the `Exsistential Container`.
3. Swift copy the value from the source of the assignment that initializes our local variable into the `Exsistential Container`.

....... to be continued .......


####Reference
- [WWDC 2016 Session 416](https://developer.apple.com/videos/play/wwdc2016/416)