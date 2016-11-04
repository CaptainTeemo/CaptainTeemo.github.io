---
layout: post
category : Notes
title:  "Warming up - a three line code quick sort in Swift"
---

```swift
func quickSort<T: Comparable>(var array:[T]) -> [T] {
   if array.isEmpty { return array }
   let pivlot = array.removeLast()
   return quickSort(array.filter { $0 < pivlot }) + [pivlot] + quickSort(array.filter { $0 > pivlot })
}
```
