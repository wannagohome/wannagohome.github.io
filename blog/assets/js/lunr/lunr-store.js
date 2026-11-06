var store = [{
        "title": "[doc] Dynamic Library에 대해 알아보자",
        "excerpt":"애플의 문서인 Overview of Dynamic Libraries에 대한 번역 입니다. Overview of Dynamic Libraries 앱의 성능을 결정하는 두개의 중요한 요소는 앱의 launch time과 메모리 사용량입니다. 앱 실행 파일의 크기를 줄이는 것과 메모리 사용량을 줄이면 launch time과 메모리 사용량을 줄일 수 있습니다.이 때, static library가 아닌 dynamic library를 사용하면 앱 실행 파일의...","categories": ["Build structure"],
        "tags": ["dynamic library","static library","translation","framework"],
        "url": "/blog/build%20structure/overview_of_dynamic_libararies/",
        "teaser": null
      },{
        "title": "[doc] framework란 무엇일까?",
        "excerpt":"애플의 문서인 What is framework?에 대한 번역 입니다. What is framework? framework는 dynamic library, nib 파일, 이미지 파일, 로컬라이즈 파일 그리고 reference 문서와 같은 공유된 리소스들을 하나의 패키지 안에 포함하고 있는 계층화된 디렉토리 입니다. 여러개의 어플리케이션들은 이런 리소스들 전부를 동시에 사용할 수 있습니다. 시스템은 이 리소스들을 필요한 만큼 메모리에 로드하며,...","categories": ["Build structure"],
        "tags": ["framework","translation"],
        "url": "/blog/build%20structure/what_is_framework/",
        "teaser": null
      },{
        "title": "[doc] iOS App Launch Time 줄이기 대작전",
        "excerpt":"애플의 문서인 Reducing Your App’s Launch Time에 대한 번역 입니다. 주의: 이해를 돕기 위한 의역의 과정에서 왜곡된 표현이 다수 포함되어 있을 수 있습니다. 자세한 내용은 원문을 참고하시기 바랍니다. Reducing Your App’s Launch Time Overview 유저에게 앱의 첫 사용경험은 launch되기 까지 기다리는 것에서 부터 시작합니다. iOS에서는 splash screen으로, macOS에서는 icoun이 통통...","categories": ["Build structure"],
        "tags": ["lauch time","translation"],
        "url": "/blog/build%20structure/reducing-your-apps-launch-time/",
        "teaser": null
      },{
        "title": "[WWDC] Xcode build를 시작하면 어떤일이 벌어질까? - (1)",
        "excerpt":"먼저는 Xcode의 Build Process에 대해 살펴보고, 다음으로 컴파일러 영역으로 넘어가 소스코드가 어떻게 오브젝트 파일로 빌드되는지 살펴보겠습니다. 마지막으로 linker에 대해 살펴보며 심볼과 소스코드의 상관관계, 컴파일러를 통해 만들어진 오브젝트 파일들로 실행파일로 만들어내는 과정에 대해 살펴 보겠습니다. Xcode Build System Build Process 앱을 빌드하는데는 수많은 과정들이 필요하고 대부분의 프로세스는 command line tool로 수행하게...","categories": ["Build structure"],
        "tags": ["build","xcode"],
        "url": "/blog/build%20structure/what_happens_when_xcode_build_start-1/",
        "teaser": null
      },{
        "title": "[doc] Mach-O에 대해 알아보자 -1",
        "excerpt":"Mach-O는 MacOS 바이너리의 executable format 입니다. 그리고 executable format은 메모리에 올리가는 바이너리 파일의 코드와 데이터의 순서를 결정합니다. 이 때, 코드와 데이터의 순서는 메모리 사용과 페이징 활동에 영향을 미치므로 프로그램 성능에 직접적인 영향을 미치게 됩니다. 프로그램을 만들기 위해서는 소스코드를 오브젝트 파일로 만들어야 합니다. 오브젝트 파일은 executable 코드 혹은 static library로 패키징...","categories": ["Build structure"],
        "tags": ["build","xcode"],
        "url": "/blog/build%20structure/about-Mach-O-1/",
        "teaser": null
      },{
        "title": "[WWDC] Xcode build를 시작하면 어떤일이 벌어질까? - (3)",
        "excerpt":"소스코드가 오브젝트 파일로 바뀌는 과정을 먼저 살펴보려는 계획이었으나, 당장 필요한 지식을 습득하기 위해 Linker영역에서 일어나는 일들을 먼저 알아보겠습니다. Linker 오브젝트들이 어떻게 링킹되고, executable로 만들어지는 지 알아보기 위해선 먼저 Linker에 대해 알아야 하겠습니다. Linker는 빌드 과정중 가장 마지막 과정에 동작합니다. 크게 두가지 input을 받아 link하고 executable을 만들어 내는데 clang과 swiftc로 만들어진...","categories": ["Build structure"],
        "tags": ["build","xcode"],
        "url": "/blog/build%20structure/what_happens_when_xcode_build_start-3/",
        "teaser": null
      },{
        "title": "[WWDC] Link 속도를 높여보자 (1) - static link",
        "excerpt":"Linking 과정에서 일어나는 일에대해 알아봄으로써 어떻게 Linking 속도를 높일수 있는지 배워봅시다. Linking 이란? 우리가 작성한 코드와 library나 framework와 같은 외부 의존성을 함께 사용하기 위해선 linker가 필요합니다. linking은 크게 두 가지 종류로 나뉘는데, 먼저 static linking은 build time에 일어나는데 build time과 app size에 영향을 주게 됩니다. 반면 dynamic linking은 앱이 실행될...","categories": ["Build structure"],
        "tags": ["build","xcode"],
        "url": "/blog/build%20structure/link-fast-1/",
        "teaser": null
      },{
        "title": "[WWDC] Link 속도를 높여보자 (2) - dynamic link",
        "excerpt":"static link에 대해 알아보았으니 이번엔 dynmaic link에 대해 알아보도록 하겠습니다. Dynamic library 지난 글에서 살펴봤던 static library를 linking하는 경우를 생각해 봅시다. 시간이 지남에 따라 프로그램의 스케일이 커지고 더 많은 라이브러리가 추가되면서 프로그램의 크기도 커질 것입니다. 결국 빌드 과정중에 static linking에 걸리는 시간도 점점 증가한다는 것을 의미합니다. 그렇다면 이렇게 바꿔보는 것은...","categories": ["Build structure"],
        "tags": ["build","xcode"],
        "url": "/blog/build%20structure/link-fast-2/",
        "teaser": null
      },{
        "title": "Swift Package Manager에 대해 알아보자",
        "excerpt":"swift는 많은 플랫폼을 지원하는 언어입니다. 따라서 애플은 다양한 플랫폼에서 동일하게 동작하는 패키지의 필요성을 느끼게 되었고 Swift Package Manager(SPM)을 만들게 되었다고 합니다. 그래서 인지 spm은 자신만의 독자적인 빌드 시스템을 가지고 있습니다. 즉, swift로 개발하고 있다면 spm을 통해 환경에 상관없이 swift 라이브러리를 사용할 수 있습니다. 이제 swift 패키지를 직접 만들어 보면서 자세한...","categories": ["Build structure"],
        "tags": ["dependency","xcode","swift","swift package","swift pacakge manager"],
        "url": "/blog/build%20structure/swift-package/",
        "teaser": null
      },{
        "title": "모듈화의 장단점",
        "excerpt":"앱을 모듈화 하는 과정은 정말 어렵습니다. 처음부터 멀티 모듈로 설계된 앱이라면 모를까 이미 만들어져 있는 프로그램 그것도 어느정도 규모가 있는 프로그램이라면 프로젝트 구조의 근간을 바꾸는 모듈화가 결코 쉽게 느껴질 수 없을 것입니다. 그렇다면 이미 잘 돌아가고 있는 서비스를 여러개의 모듈로 쪼개야만 할까요? 정확한 판단을 위해 모듈화를 결정하면 어떤일이 벌어질지 짚어보겠습니다....","categories": ["Modulization"],
        "tags": ["modulization"],
        "url": "/blog/modulization/should-we-modulize-app/",
        "teaser": null
      },{
        "title": "arm64-simulator binary가 sdk를 의존할 때 m1 simulator 환경에서 빌드하기",
        "excerpt":"최근 참여하고 있는 프로젝트의 dependency manager를 cocoapod에서 spm으로 변경하는 작업을 진행하게 되었습니다. 단순하게 pod을 제거하고 swift package로 대체하려 하려 했지만, 몇 가지 문제가 발생하여 이 문제점을 해결해 나가는 과정을 정리해보았습니다. 지금은 맥의 모든 라인업에서 애플 실리콘 제품이 출시되기도 했고, 거의 대부분의 소프트웨어도 arm64 아키텍쳐에 대응하는 제품을 출시하며 호환성 문제가 거의...","categories": ["Xcode"],
        "tags": ["binary","build setting"],
        "url": "/blog/xcode/build_app_with_arm64_simulator_without_arm64_simulator_binary/",
        "teaser": null
      },{
        "title": "객체지향적인 코드란 무엇인가?",
        "excerpt":"조영호님의 책 객체지향적의 사실과 오해를 읽고 OOP에 대한 많은 영감을 받아 이를 정리한 글 입니다. 객체지향이란 객체지향은 과거 프로그램을 순차적인 명령어의 집합으로 바라보던 시각에서 벗어나 독립적인 객체들의 집합과 (메세지를 통한) 객체들의 상호 협력으로 바라보는 프로그래밍 페러다임입니다. 프로토타입 기반 언어인 Javascript를 제외한 현대의 거의 대부분의 프로그래밍 언어가 객체지향을 지원하고 있고, 이들...","categories": ["Programming"],
        "tags": ["OOP","객체지향의 사실과 오해"],
        "url": "/blog/programming/object-oriented-programming-1/",
        "teaser": null
      },{
        "title": "Swift 동시성 프로그래밍 tutorial - (1)",
        "excerpt":"매해 발전을 거듭해 오는 Swift이지만, 2021년에는 Swift 5.5에 동시성 프로그래밍을 위한 기능들이 추가되면서 더 큰 발전을 이루어 냈습니다. 바로 async, await, actor가 추가된 것인데요. Async/await, Async/Await: Sequences, Continuations for interfacing async tasks with synchronous code, Structured concurrency, Actors, async let bindings 등등.. 많은 언어들이 이미 지원하는 기능으로 전혀 새로운 것은...","categories": ["Programming"],
        "tags": ["Swift","Concurrency"],
        "url": "/blog/programming/swift-concurrency-1/",
        "teaser": null
      },{
        "title": "Tuist를 적용하며 배운것들",
        "excerpt":"최근 회사에서 프로젝트에 Tuist를 적용하는 업무를 맡게되었습니다. 그 과정중에 예상치 못한 난관들을 겪게되면서 많은 것들을 배우고 익힐 수 있었는데요. 지금도 휘발되고 있는 기억들을 어떻게든 붙잡아 보고자, Tuist를 적용하는 과정에서 배운 것들과 고민했던 것들을 나열해보고자 합니다. Swift Package Manager 패키지를 만드는(선언하는) 법 / 조금더 자세하게한 부분을 익힐 수 있었다 하나의 타겟에는...","categories": ["Programming"],
        "tags": ["Tuist"],
        "url": "/blog/programming/tuist-what-i-learned/",
        "teaser": null
      }]
