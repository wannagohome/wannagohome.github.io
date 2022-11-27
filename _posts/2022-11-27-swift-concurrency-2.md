---
title: "Swift 동시성 프로그래밍 tutorial - (2)"
categories:
  - Programming
tags:
  - Swift
  - Concurrency
published: false
---

<br/>

# Asysnc Property
비동기 함수를 만들 수 있듯이, 비동기 property를 만드는 것 또한 가능합니다. 바로 computed property를 async하게 만드는 것입니다.

<br/>

``` swift
var data: Data {
    get async throws {
        let (data, _) = try await URLSession.shared.data(from: url)
        return data
    }
}
```

<br/><br/>