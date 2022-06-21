---
title: "Swift Package Manager에 대해 알아보자"
categories:
  - Build structure
tags:
  - dependency
  - xcode
  - swift
  - swift package
  - swift pacakge manager
published: true
---

swift는 많은 플랫폼을 지원하는 언어입니다. 따라서 애플은 다양한 플랫폼에서 동일하게 동작하는 패키지의 필요성을 느끼게 되었고 Swift Package Manager(SPM)을 만들게 되었다고 합니다. 그래서 인지 spm은 자신만의 독자적인 빌드 시스템을 가지고 있습니다. 즉, swift로 개발하고 있다면 spm을 통해 환경에 상관없이 swift 라이브러리를 사용할 수 있습니다.

 <!-- spm은 swift로 만들어졌으며, spm또한 하나의 swift 패키지 입니다. -->

이제 swift 패키지를 직접 만들어 보면서 자세한 내용들을 살펴보겠습니다.

 ``` bash
 $ mkdir SamplePackage && cd SamplePackage
 $ swift package init
 $ tree .
.
├── Package.swift
├── README.md
├── Sources
│   └── SamplePackage
│       └── SamplePackage.swift
└── Tests
    └── SamplePackageTests
        └── SamplePackageTests.swift
 ```

`swift package init` 으로 패키지를 만들수 있습니다. 디렉토리 이름을 딴 패키지가 만들어 졌네요. `Package.swift` 파일은 manifest 파일로 패키지의 전체 구조를 나타냅니다. 아래와 같은 파일이 만들어 졌네요. (Xcode 13.4.1)

``` swift
// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SamplePackage",
    products: [
        // Products define the executables and libraries a package produces, and make them visible to other packages.
        .library(
            name: "SamplePackage",
            targets: ["SamplePackage"]),
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .target(
            name: "SamplePackage",
            dependencies: []),
        .testTarget(
            name: "SamplePackageTests",
            dependencies: ["SamplePackage"]),
    ]
)

```

swift 패키지의 manifest는 언제나 `// swift-tools-version: *` 라는 커멘트 주석으로 시작해야 합니다. 패키지를 빌드하기위한 swift의 최소 버전을 나타냅니다.

swift 패키지는 **Products, Dependencies, Targets** 이렇게 크게 세 부분을 나뉩니다. **Dependencies**에는 패키지에 필요한 또 다른 패키지가 의존성으로 들어갑니다. 각 의존성에는 우리가 만드려는 패키지 처럼 결과물은 product를 제공하고 패키지에서 사용할 수 있습니다.

``` swift
...

let package = Package(
    ...
    dependencies: [
         .package(url: "https://github.com/Alamofire/Alamofire.git", .upToNextMajor(from: "5.6.1")),
         .package(url: "https://github.com/Alamofire/Alamofire.git", branch: "master")
    ],
    ...
)

```

Alamofire 패키지를 의존성을 추가한 모습입니다. remote 패키지에는 url과 버전정보가, local 패키지에는 이름과 경로가 필요합니다. 버전은 repository의 tag를 기준으로 나뉘어지며 버전 정보 대신에 branch를 지정할 수도 있습니다.

**Targets**는 패키지의 빌딩 블록으로 우리가 개발하는 Xcode 프로젝트의 타겟과 유사합니다. 기본적으로 만들고자 하는 target의 이름이 필요하고, target에 포함시키길 소스코드의 경로, 의존성 등을 지정할 수 있습니다. 같은 패키지의 다른 타겟을 의존하는 것 또한 가능합니다.

**Products**에는 패키지가 만들어낼 output을 정의합니다. (library or executable) 외부의 패키지는 이 product에 정의된 결과물을 의존하게 되는 것입니다. 여기에선 executable의 타입을 static이나 dynamic으로 지정할 수 있는데 지정하지 않을 경우 swift 패키지가 스스로 알맞는 타입을 지정합니다. 대부분의 경우 static타입으로 의존성이 걸리던데, 프로젝트에 동일한 패키지가 있을 경우 dynamic으로 바뀌는 것이 아닐까 추측합니다.

swift 5.3(Xcode12)이상을 사용한다면 다음과 같은 기능을 추가로 사용할 수도 있습니다.

1. 패키지에 리소스를 추가할 수 있었습니다. static library에는 리소스를 넣을 수 없어서 별도의 번들을 만들거나 dynamic library로 만들어야 했지만, spm을 사용할 경우 굳이 dynamic type의 의존성을 만들 필요가 없어졌습니다.
2. 2019년 애플에서 소개한 새로운 바이너리 프레임워크인 XCFramework를 타겟의 형태로 추가해 사용할 수 있습니다.

``` swift
let package = Package(
    ...
    targets: [
        .target(
            name: "SamplePackage",
            dependencies: []),
        .binaryTarget(
            name: "SampleBinaryPackage",
            url: "https://url/to/sample/remote/xcframework.zip",
            checksum: "Samle checksum"
        ),
        .binaryTarget(
            name: "SampleBinaryPackage",
            path: "/sample/path"
        ),    
        .testTarget(
            name: "SamplePackageTests",
            dependencies: ["SamplePackage"]),
    ]
)
```

<br/><br/>

#### *<u>ref.</u>*
[Getting to Know Swift Package Manager](https://developer.apple.com/videos/play/wwdc2018/411)

[Bundling Resources with a Swift Package](https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package)

[Distributing Binary Frameworks as Swift Packages](https://developer.apple.com/documentation/xcode/distributing-binary-frameworks-as-swift-packages)

[Package Manager](https://www.swift.org/package-manager/#conceptual-overview)

[Using the Package Manager](https://www.swift.org/getting-started/#using-the-package-manager)