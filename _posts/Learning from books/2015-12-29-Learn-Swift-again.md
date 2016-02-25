---
layout: post
title:  "Learn Swift again"
category : Learning from books
---

I've been learning and playing Swift for a period of time, now that Swift has been [open source](https://swift.org/), it's time to review what I missed with **Swift Programming: The Big Nerd Ranch Guide**.


####Overflow operator

Scenario:

```swift
let y: Int8 = 120
let z = y + 10
```


There is no surprise that compiler will throw an error.

`Computer stores like 0 0 0 0 0 0 0 0 for 8 bit integers, which means range of Int8 should be [-128, 127]. `



Wrap around:

>Swift provides *overflow operators* that have different behavior when the value is too big or too small.

| Operators | Description |
| :---------: | :-----------: |
| &+ | overflow addition operator |
| &- | underflow subtraction operator |
| &* | overflow multiplication operator |

>Since y is an **Int8**, once you get to 127 you cannot go any higher. Instead, incrementing one more time wraps around to -128. So 120 + 8 = -128, 120 + 9 = -127, and 120 + 10 = -126.



####The `fallthrough` keyword

Scenario:

```swift
let statusCode = 404
var errorString = "The request failied with the error: "
switch statusCode {
case 400, 401, 403, 404:
    errorString = "There was something wrong with the request."
    fallthrough
default:
    errorString += " Please review the request and try again."
}
```

>We add a *control transfer statement* called `fallthrough`. Control transfer statements allow you to modify the order of execution in some control flow. These statements *transfer* control from one chunk of code to another.
>Here, `fallthrough` tells the `switch` statement to "fall through" the bottom of a case to the next one. If a matching case has a `fallthrough` statement at the end, it will hand off control to the case below, and so on. `fallthrough` statement allow you to enter a case and execute its code without having to match against it.



####The `if-case` syntax

Scenario:

```swift
let age = 25
switch age {
case 18...25:
    print("Cool demographic")
default:
    break
}
```

Looks good, but we can do better!

```swift
if case 18...35 = age {
    print("Cool demographic")
}
```

>This syntax is much more elegant. It simply checks to see if `age` is in the given range. You did not have to write a `default` case that you did not care about.

And we could even add a `where` clause:

```swift
if case 18...35 = age where age >= 21 {
    print("In cool demographi and of drinking age")
}
```

Pretty cool right?


#### The `for-case` syntax

Scenario:

```swift
for case let i in 1...100 where i % 3 == 0 {
    print(i)
}
```

>Here we are using a `case` allows for finer control over when the loop execute its code. Use a `case` with a `where` clause to provide a logical test that must be met in order to execute the loop's code. If the condition rstablished by the `where` clause is not met, then the loop's code is not run.

So for the code above, the `for` loop will print integers from 1 to 100 which can be divided by 3.


#### Closures Capture Values!

Closures and functions can keep track of internal infomation encapsulated by a variable defined in their enclosing scope.

```swift
func makeGrowthTracker(growth: Int) -> () -> Int {
    var totalGrowth = 0
    func growthTracker() -> Int {
        totalGrowth += growth
        return totalGrowth
    }
    return growthTracker
}

var counter = 0
let growBy500 = makeGrowthTracker(500)
growBy500()
growBy500()
counter += growBy500()
```

Well, the value of counter is 1500. It turns out the closure is keeping an internal running total of growth.


#### Closures Are Reference Types!

```swift
let growBy500Ref = growBy500
counter = growBy500Ref()
```

And then value of counter should be 2000.


#### Functional Programming

The following theoretical stuff was just copied from book.

>Swift adopts some patterns from the *functional programming* paradigm. It is difficult to provide a concrete definition of functional programming because people use the phrase with different meanings and intentions, but typically it is understood to include:

>+ *First-class functions* – functions can be passed as arguments to other functions, can be stored in variables, etc.; they are just like any other type.

>+ *Pure functions* – functions have no side effects; functions, given the same input, always return the same output, and do not modify other states elsewhere in the program. Most math functions like sin, cos, fibonacci, and factorial are pure.

>+ *Immutability* – mutability is de-emphasized as it is more difficult to reason about data whose values can change.

>+ *Strong typing* – a strong type system increases the runtime safety of the code because the guarantees of the language’s type system are checked at compile time.

>Swift supports all of these approaches.

>Functional programming can make your code more concise and expressive. By emphasizing immutability and strong compile time type checking, your code can also be safer at runtime. These hallmarks of functional programming can also make code easier to reason about and maintain.

>Swift’s `let` keyword allows you to declare immutable instances in your code. Its strong type system helps you to catch errors at compile time instead of at runtime. Swift also provides several *higher-order functions* that are well known to developers fond of functional programming: **map(_:)**, **filter(_:)**, and **reduce(_:combine:)**. These functions emphasize that Swift’s functions are indeed first-class citizens.


#### Higher-order functions

##### map(_:)

```swift
let array = [1, 2, 3, 4, 5]
print(array.map { "\($0)"})
// prints ["1", "2", "3", "4", "5"]
```

##### flatMap(_:)

```swift
let nestedArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(nestedArray.flatMap { $0.map { "\($0)" } })
// note that the first $0 here refers to an element of nested array which is an array.
// so it prints ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
```

##### filter(_:)

```swift
let array = [1, 2, 3, 4, 5]
print(array.filter { return $0 > 3 })
// prints [4, 5]
```

##### reduce(_:combine:)

Reduce the values in the collection to a single value that is returned from the function.

```swift
let array = [1, 2, 3, 4, 5]
print(array.reduce(0, combine: +))
// here we caculate the sum of array's each value
// so console shows 15
// it's equivalent to the following:
var sum = 0
for element in array {
    sum += element
}
print(sum)
```

#### The Mystery of Enum

##### Methods in Enum

A method is a function that is associated with a type. In some languages, methods can only be associated with classes. In Swift, methods can also be associated with enums.

Imagine there is a lightbulb which has states *on* and *off*

```swift
enum Lightbulb {
    case On
    case Off
    
    // since enum is value type, we should mark this function mutating
    mutating func toggle() {
        switch self {
        case .On:
            self = .Off
        case .Off:
            self = .On
        }
    }
}
// the lightbulb is off in initial state.
var bulb = Lightbulb.Off
// and we are going to turn it on
bulb.toggle()
// lights!
```

##### Associated Values

Swift offers a powerful flavor of enumeration: cases with associated values. Associated values allow you to attach data to instances of an enumeration, and ddifferent cases can have different types of associated values.

```swift
enum ShapeDimensions {
    case Point
    case Square(Double)
    case Rectangle(width: Double, height: Double)
    
    func area() -> Double {
        switch self {
        case .Point:
            return 0
            
        case let .Square(side):
            return side * side
            
        case let .Rectangle(width, height):
            return width * height
        }
    }
}

let square = ShapeDimensions.Square(10.0)
square.area() // 100

let rect = ShapeDimensions.Rectangle(width: 5.0, height: 10.0)
rect.area() // 50

let point = ShapeDimensions.Point
point.area() // 0

```

##### Recursive Enumerations

Thinking of a binary tree, made by Enum:

```swift
enum BinaryTree<T> {
    case Node(left: BinaryTree?, right: BinaryTree?, value: T)
}
```

If we type the code above in Xcode, the compiler will complain about that our BinaryTree is not marked "indirect".

What's the problem?

> The compiler knows that any instance of an enum will only ever be in one case at a time, although it may change cases as your program runs. Therefore, when the compiler is deciding how much memory an instance of enum requires, it will look at each case and figure out which case requires the most memory. The enum will require that much memory (plus a little bit more that the compiler will use to keep track of which case is currently assigned).

Now let's look back at our **ShapeDimensions** enum. The `.Point` case has no associated data, so it requires no extra memory. The `.Square` case has an associated **Double**, so it requires one **Double**'s worth of memory(8 bytes). The `.Rectangle` case has two associated **Double**s, so it requires 16 bytes of memory. The actual size of an instance of **ShapeDimensions** is 17 bytes: enough room to store **.Rectangle**, if necessary, plus one more byte to keep track of which case the instance actually is.

Considering our **BinaryTree** enum, How much memory is required for the `.Node` case? The answer is we don't know, and the compiler doesn't know either. So **BinaryTree** would require an infinite amount of memory!

Swift knows the problem. Instead of deciding how much memory `.Node` will require(which would lead back into infinite recursion), we use the key word `indirect` to instruct the compiler to instead store the enum's data behind a pointer.

```swift
indirect enum BinaryTree<T> {
    case Node(left: BinaryTree?, right: BinaryTree?, value: T)
}
```

or if only some specific cases need to be recursive, we should put `indirect` before each `case`.

```swift
enum BinaryTree<T> {
    indirect case Node(left: BinaryTree?, right: BinaryTree?, value: T)
}
```

Then we are making a binary tree with joy:

```swift
let tree = BinaryTree.Node(
    left: .Node(
        left: .Node(
            left: nil,
            right: nil,
            value: 3
        ),
        right: nil,
        value: 1
    ),
    right: .Node(
        left: nil,
        right: nil,
        value: 2
    ),
    value: 0
)
```

If we sketch it out, it looks like

![alt tag](https://raw.github.com/CaptainTeemo/CaptainTeemo.github.io/master/assets/images/enum_binaryTree.png)
