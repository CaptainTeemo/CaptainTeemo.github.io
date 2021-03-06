# UIColor with Hex

Sometimes we want to create UIColor with hex, but there isn't any builtin way, so let't make our own.

We hope our function to create UIColor with hex is something like `UIColor(1BB0F4FF)`, obviously it's better to be added as an extension.

```swift
extension UIColor {
	convenience init(hex: Int) {

	}
}
```

So here comes the problem: **how can we convert hex to decimal?**

First look at the given hex `1BB0F4FF`, we consider every two elements as a component of color's rgb, so the rgb is `red: 1B, green: B0, blue: F4`, and yes the last component is `alpha`.

In order to extract component from hex, we need to use bitwise shifting.

`hex >> 24` means right shift by `24` positions, in binary of course, results in the hex `1B`, which is `27` in decimal. Additionally we should better add a logical AND operator with `0xff` to ensure it won't be greater than `255`.

Enough talking, let's showing the code.

```swift
convenience init(hex: Int) {
	self.init((hex >> 24) & 0xff, (hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff)
}
```

Oops, there's an error said `Argument labels '(_:, _:, _:, _:)' do not match any available overloads`.

![](/assets/excuseme.jpg)

But that's not a big deal, let's fix it.

```swift
convenience init(_ red: Int, _ green: Int, _ blue: Int, _ alpha: Int) {
	guard case 0...255 = red, case 0...255 = green, case 0...255 = blue, case 0...255 = alpha else { fatalError("invalid color value") }
	self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: CGFloat(alpha) / 255.0)
}
```

Now `UIColor` can be created by hex.

![](/assets/UIColorHex.png)
