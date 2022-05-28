---
title: "[번역] Overview of Dynamic Libraries"
categories:
  - Build structure
tags:
  - dynamic library
  - static library
  - translation
  - framework
---

<br/>

애플의 문서인 [Overview of Dynamic Libraries](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/OverviewOfDynamicLibraries.html#//apple_ref/doc/uid/TP40001873-SW1)에 대한 번역 입니다.

<br/><br/>

# Overview of Dynamic Libraries

앱의 성능을 결정하는 두개의 중요한 요소는 앱의 launch time과 메모리 사용량입니다. 앱 실행 파일의 크기를 줄이는 것과 메모리 사용량을 줄이면 launch time과 메모리 사용량을 줄일 수 있습니다.이 때, static library가 아닌 dynamic library를 사용하면 앱 실행 파일의 크기를 줄일 수 있습니다.게다가 launch 시점이 아닌 필요해지는 시점에 특정 기능을 불러오는 지연로딩을 가능하게 합니다.이런 기능은 launch time을 줄이고 효율적이 메모리 사용이 가능하도록 돕습니다.

이 아티클에서는 dynamic library를 소개하고 static libary 대신 dynamic lybrary를 사용하는 것이 어떻게 파일의 크기와 앱의 초기 메모리 사용량을 줄이는지를 보여줄것입니다. 또한 앱이 런타임에 dynamic library를 사용하는데 동원되는 dynamic loader의 호환성 기능에 대한 내용을 포함하고 있습니다.

앱이 가지고 잇는 대부분의 기능들은 libaray의 실행코드에 의해 구현됩니다. 앱이 static linker를 통해 libaray와 link 될 때, 앱이 사용하는 코드는 생성된 실행파일에 복사 됩니다. static linker는 object code라고 하는 컴파일된 소스코드와 libaray 코드를 런타임시에 메모리에 로드되는 하나의 실행 파일로 모읍니다. 이렇게 앱의 실행파일의 일부가 되는 libaray를 static library라고 합니다. static libary는 실행파일의 collection 혹은 archive라고 할 수 있습니다.

앱이 실행될 때 link 되어 있는 static libary들의 코드가 포함된 앱의 코드는 앱의 주소공간에 로드됩니다. 다수의 static libray들을 앱에 link하는 것은 앱 실행파일의 크기를 키웁니다. Figure 1.은 static libarary에 구현된 기능을 사용하는 앱의 메모리 사용을 도식화 한 것입니다. 큰 실행파일을 가지고 있는 어플리케이션은 긴 launch time과 큰 메모리 사용량으로 어려움을 겪게됩니다. 그리고 그런 앱의 사용자들은 그들이 가지고 있는 앱의 복사본을 최신 버전으로 교체해야만 합니다. 따라서 static library의 최신 기능으로 앱을 최신 버전으로 유지하는 것은 개발자와 사용자 모두의 불필요한 작업을 요구하게 됩니다.

앱의 코드를 필요한시점에 주소(메모리)공간에 로드하는 것이 더 나은 접근법이라 할 수 있습니다. 이러한 유연성을 가지고 있는 library를 dinamic libaray라고 합니다. dynamic library는 앱에 정적으로 link되지 않습니다. (실행 파일의 일부가 되지 않습니다) 대신, dynamic library는 앱이 launch되고 난 후(런타임 중)에 앱에 로드 및 링크됩니다.



![app-using-static-libraries](https://github.com/wannagohome/wannagohome.github.io/blob/b3d8597bf62e8421806b38023282387b65cd8f57/assets/images/overview_of_dynamic_libararies/app-using-static-libraries.png?raw=true)
**Figure 1.** App using static libraries

<br/>

Figure 2.는 dynamic library가 static library와는 달리 어떻게 앱이 launch되고 난 후 메모리 사용량을 줄이면서 기능들을 implement하는지를 보여줍니다.



![app-using-dynamic-libraries](https://github.com/wannagohome/wannagohome.github.io/blob/b3d8597bf62e8421806b38023282387b65cd8f57/assets/images/overview_of_dynamic_libararies/app-using-dynamic-libraries.png?raw=true)
**Figure 2.** App using static libraries

<br/>

dynamic libarary를 사용하면 libarary를 동적으로 link하기 때문에 프로그램은 library에 대한 개선으로인한 이점을 얻을 수 있습니다. 앱 개발자가 앱을 다시 컴파일 하지 않고도 앱의 기능을 개선하고 확장할 수 있게되기 때문입니다. OS X의 모든 시스템 library가 dynamic library이기 때문에 OS X앱은 앞서 설명한 이점들을 누릴 수 있습니다.