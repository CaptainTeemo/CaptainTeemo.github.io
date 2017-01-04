# Warming up - a three line code quick sort in Swift

```swift
func quickSort<T: Comparable>(var array:[T]) -> [T] {
   if array.isEmpty { return array }
   let pivot = array.removeLast()
   return quickSort(array.filter { $0 < pivot }) + [pivot] + quickSort(array.filter { $0 > pivot })
}
```
