---
title: "Swift 동시성 프로그래밍 tutorial - (1)"
categories:
  - Programming
tags:
  - Swift
  - Concurrency
published: true
---

매해 발전을 거듭해 오는 Swift이지만, 2021년에는 Swift 5.5에 동시성 프로그래밍을 위한 기능들이 추가되면서 더 큰 발전을 이루어 냈습니다. 바로 async, await, actor가 추가된 것인데요.  
[Async/await](https://github.com/apple/swift-evolution/blob/main/proposals/0296-async-await.md), [Async/Await: Sequences](https://github.com/apple/swift-evolution/blob/main/proposals/0298-asyncsequence.md), [Continuations for interfacing async tasks with synchronous code](https://github.com/apple/swift-evolution/blob/main/proposals/0300-continuation.md), [Structured concurrency](https://github.com/apple/swift-evolution/blob/main/proposals/0304-structured-concurrency.md), [Actors](https://github.com/apple/swift-evolution/blob/main/proposals/0306-actors.md), [async let bindings](https://github.com/apple/swift-evolution/blob/main/proposals/0317-async-let.md) 등등..  
많은 언어들이 이미 지원하는 기능으로 전혀 새로운 것은 아니지만, 수 많은 개발자들의 생산성을 높여줄 수 있을 것이라는 기대에 많은 분들이 기다려 왔던 것으로 압니다. 오늘은 이들을 어떻게 사용하는지에 대해 알아보고자 합니다.

<br/>

# 배경
동시성은 아주 오래전 부터 제시되어 온 개념입니다. 여러가지 연산을 독집적인 단위로 나누고 이를 서로 다른 실행 흐름에서 실행할 수 있는 능력을 의미하며, 컴퓨터 프로세서가 multi threading 성능을 높이는 쪽으로 발전하기 시작하면서 동시성 프로그래밍 또한 함께 발전하게 되었습니다.

동시성 프로그래밍이라는 개념이 오래된 만큼, swift는 이미 동시성 프로그래밍을 지원하고 있었습니다. 바로 GCD와 Operation Queue를 통해서 말이지요. GCD는 아주 강력한 프레임워크로서 동시성 프로그래밍을 아주 편하게 만들어 줍니다. (thread를 직접 만들과 관리할 필요가 없다니 세상에 마상에....) 하지만 인간의 욕심은 끝이 없어 GCD의 closure 까지 없애고자 하니, 이를 돕는 것이 이번 글에서 알아볼 async, await, actor 입니다.

특히 iOS 앱을 개발하다 보면 수 많은 비동기 작업들을 수행하게 됩니다. 기존에는 이 비동기 작업이 만들어 내는 callback 지옥을 벗어나고자 반응형 프로그래밍을 많이들 사용해 왔었는데, 언어의 차원에서 이를 개선할 수 있는 방안이 새롭게 추가된 것입니다.

*<font color='gray'>(GCD의 작동 방식이나 Dispatch Queue등에 대한 내용을 생략하겠습니다)</font>*

<br/>

# 비동기 함수를 만들어보자

``` swift
func sum(_ a: Int, _ b: Int) async -> Int {
    return a + b
}

let result = await sum(2, 3)
print(result) // 5
```

비동기 함수를 만드는 방법은 아주 간단합니다. return type을 쓰기전에 **<font color='#ED6E57'>async</font>** 키워드를 붙이고, 이를 사용하는 쪽에서는 **<font color='#ED6E57'>await</font>** 키워드를 붙여 호출하는 것 입니다. 하지만 조금 이상한 부분이 있습니다. 단순히 + 연산을 하는 것에 비동기 작업이 필요한가요? 여기에서 **<font color='#ED6E57'>async</font>** 는 비동기 작업이 <u>있을 수 있다</u>는 것을 나타냅니다. 따라서 sum(\_:\_:)과 같은 함수를 만들어도 아무런 문제없이 컴파일이 가능합니다.

명심하시기 바랍니다. suspension point는 async가 함수가 아닌 await로 함수가 호출되는 부분에서 만들어집니다.

이와 함께 몇 가지 더 짚고 넘어가야할 내용이 있습니다.  
1. async 함수가 호출되어 suspend 상태에 들어갔을 때 이 함수를 호출한 다른 async 함수들도 모두 suspend 됩니다.
2. 동기함수는 async 함수를 직접 호출하지 못합니다. 동기함수는 자기자신을 suspend 시키는 방법을 알지 못합니다.
3. suspend는 blocking이 아닙니다. suspend가 일어났어도 thread는 계속 동작합니다. 만약 비동기 함수 Foo를 호출한뒤 다른 비동기 함수 Bar를 호출한다고 했을 때, Bar가 먼저 실행 될 수 있습니다.

<br/>

비동기 함수가 Error를 내뱉는 경우가 있을 수 있습니다. 네트워크 호출이 가장 대표적인 예시가 될 것 같네요.

``` swift
func fetch() async throws -> Data {
    return try await URLSession.shared.data(from: someURL)
}

if let data = try? await fetch() {
    print("Data fetched")
}
```

이렇게 async await에 thorws와 try가 함께 사용될 수 있습니다. throws는 async뒤에 써야하지만 try는 awiat앞으로 와야 합니다.

<br/>

# 비동기 함수를 호출해 보자

사실 위의 소스코드와 설명들을 자세히 들어다 보면 이상한 점을 발견할 수 있습니다. await로 async 함수를 호출하는 부분은 suspension point가 될 수 있습니다. 그리고 동기 함수는 이 suspension을 어떻게 다뤄야 할지 알지 못하니 직접 호출이 불가능합니다. 그런데 우리가 만드는 함수들은 모두 기본적으로 동기 함수입니다. 이는 top level도 마찬가지 입니다. 따라서 위의 코드를 그대로 따라하면 컴파일 오류로 실행조차 되지 않는것을 확인 할 수 있습니다. async 함수는 또다른 async 함수에서만 호출이 가능한데, 어떻게 호출할 수 있을까요?

크게 세 가지를 최초의 async 함수로 사용할 수 있습니다.
1. @main attribute가 붙어있는 곳의 main 함수. 즉, 프로그램의 entry point.
2. SwiftUI framework 내에 async 함수를 trigger 할 수 있는 곳들 ex_ refreshable(), task()
3. [Task](https://developer.apple.com/documentation/swift/task)


**<font color='#ED6E57'>Task</font>** 는 동기함수 에서 async 함수를 호출 할 수 있도록 해줍니다.

``` swift
func fetch() async throws -> Data {
    return try await URLSession.shared.data(from: someURL)
}

func fetchAsynchronously() {
    Task {
        await fetch()
    }
}
```
<br/>

물론 fetchAsynchronously()는 여전히 suspend를 하지 못하므로 Task의 결과를 기다리지 않고 return 됩니다.


<br/>

async와 await의 사용법을 간단하게 짚어보았습니다. 다음에는 비동기 프로퍼티에 대해 알아보겠습니다.


<br/><br/>

#### *<u>ref.</u>*
[객체지향적의 사실과 오해](https://wikibook.co.kr/object-orientation-ebook/)