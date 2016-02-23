---
layout: post
title:  "Learn Swift again"
date:   2015-12-29 12:04:47 +0800
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

That's pretty well, but we can do better!

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

```
