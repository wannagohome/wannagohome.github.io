---
title: "[번역] Reducing Your App’s Launch Time"
categories:
  - Build structure
tags:
  - lauch time
  - translation
---

<br/>

애플의 문서인 [Reducing Your App’s Launch Time](https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time)에 대한 번역 입니다.
> 주의: 이해를 돕기 위한 의역의 과정에서 왜곡된 표현이 다수 포함되어 있을 수 있습니다. 자세한 내용은 원문을 참고하시기 바랍니다.

<br/><br/>

# Reducing Your App's Launch Time


## Overview

유저에게 앱의 첫 사용경험은 launch되기 까지 기다리는 것에서 부터 시작합니다. iOS에서는 splash screen으로, macOS에서는 icoun이 통통 튀는 모션으로 앱이 lauching상태에 있음을 나타냅니다. 앱은 유저가 원하는 것을 얻을 수 있도록 최대한 빠르게 작업을 수행해야 할 것입니다. lauch가 너무 올래갈리게 되면 유저는 좋지 않은 사용자 경험을 느끼게 될 것이고, 특히 iOS의 경우 luach time이 과도하게 길어지는 앱은 watchdog에 의해 종료됩니다. 대체로 앱이 그들의 일상중 하나로 자리잡을 경우 유저는 하루에도 여러번 앱을 실행 시킬 것이고, 오래걸리는 lauch time은 그 때마다 유저의 작업을 지연시킬 것입니다.

iOS의 경우 유저가 홈 화면에서 앱의 아이콘을 탭하면 iOS는 앱 프로세스에게 제어권을 넘기기 전의 앱의 lauch를 준비합니다. 그리고 나서 앱은 화면에 UI를 그려내기 위해 코드를 실행십니다. 앱이 UI가 화면에 표시되고 난 이후에도 앱은 여전히 컨텐츠를 준비하거나 loading pinner와 같은 인터페이스를 final control로 교체하기 위해  준비중 일 수도 있습니다. 이런 단계들이 전체적인 launch time을 만들어 내며 당신은 이를 줄이기 위한 단계를 밟아나갈 수 있습니다.

<br/>

## Understand App Activations

activation은 유저가 아이콘을 클릭하거나 앱을 다시 돌아갈 때 발생합니다.

iOS에서는 lauch와 resume 모두 activation에 속합니다. lauch는 프로세스를 실행시켜야 할 때를 말하며, resume은 (suspended 상태라 할지라도) 실행중인 프로세스가 이미 있는 상태를 이야기합니다. 보통의 경우 resume이 훨씬 빠르며 최적화를 위한 작업도 lauch와는 차이가 있습니다.

macOS에서는 정상적인 경우에 시스템이 프로세스를 종료시는 일은 발생하지 않습니다. activation을 위해선 시스템이 compressor에서 memory를 가져오거나 swap 혹은 다시 렌더링 할 필요가 있을 수 있습니다.

<br/>

## Understanding Cold and Worm Launch

앱의 activation은 디바이스가 이전에 했던 행동에 따라 크게 달라집니다.

예를들어 iOS에서 홈 화면으로 돌아간 즉시 앱을 재진입하게 되면 어느 상황보다 가장 빠르게 activation이 이루어 질것입니다. 그리고 이건 resume과도 비슷합니다. 시스템에서 lauch가 필요한 경우는 "warm launch"라고 부릅니다.

반대로, 예를들어 우저가 memory intensice한 게임을 플레이 하고난 뒤 앱으로 재진입 한다면 이는 평균적인 activation에 비해 훨씬 오래걸릴 것입니다. iOS에서는 forground에 있는 어플리케이션에 더 많은 메모리를 허용하기 위해 다른 앱을 메모리에서 제거합니다. 앱 launching에 의존하는 프레임워크와 데몬은 재 launching과 디스크 에서의 패이징이 필요할 수도 있습니다. 이런 경우 혹은 boot 직후 launch가 되는 경우를 "cold launch"라고 부릅니다.

warn lauch와 cold lauch의 다양한 경우를 고려하십시요. 유저가 앱을 실제로 사용할 때 디바이스의 상태에 따라 다양한(서로 다른) 성능을 경험을 하게 될 것이기 때문입니다. 이것이 다양한 환경에서 테스트함으로 실사용의 환경에서의 성능을 예측하는 것이 중요한 이유 입니다.

<br/>

## Gather Metrics About Your App’s Launch Time

launch과정의 복잡합은 앱이 현장에서 어떻게 동작하는지 이해하는 것이 어려울 수 있음을 의미합니다.

iOS앱은 Xcode Organizer의 Lauch Time 측정 도구를 사용해 사용자가 아이콘을 탭한 후 부터 첫 화면이 그려질때 까지의 시간을 millisecond단위로 확인할 수 있습니다. filter를 사용하여 서로 다른 디바이스에서의 launch time을 확인해 보십시요. 현재 릴리즈와 이전 릴리즈의 launch time을 그래프를 통해 비교해 볼 수도 있습니다.

![1](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/reducing_your_apps_launch_time/reducing-your-app-s-launch-time-1_dark.png?raw=true)

<br/>

## Profile Your App’s Launch Time

앱의 launch가 얼마나 오래걸리는 지를 알았다면 왜 이렇게 시간이 걸리는지를 알아야 합니다. 어디서 앱이 시간을 소요하는지에 대한 데이터를 모으기 위해 앱의 코드를 프로파일링 하는 것이 바로 그 방법입니다. 프로파일링 과정중에 Instruments는 앱이 호출한 메소드 정보와 실행하는 얼마나 많은 시간이 걸렸는지에 대한 정보를 수집합니다. 이 데이터를 사용해 잠재적 병목이나 코드의 이슈를 찾아내십쇼.

instruments에 있는 App Launch 템플릿을 사용해 앱을 프로파일 하십시요. instruments는 lauch되는 동안  time profile과 thread-state trace를 수집할 것입니다. thread-state trace를 사용하면 thread가 active 혹은 block 상태에 들어간 시간과 그리고 왜 그런 상태로 변환이 됐는지 알 수 있습니다.

각기 다른 상황에서 이런 요소들이 앱의 launch time에 영향을 미치는지 프로파일링 해보시기 바랍니다. 다음은 테스트 해볼 수 있는 몇 가지 상황들 입니다 :

 - 디바이스의 전원을 켠 후 처음으로 잠금이 풀린 상태에서 앱을 실행해 보십시오.
 - 앱을 강제종료후 실행해 보십시오. 시스템을 앱 프로세스를 종료시킨후 warm launch를 수행할 것입니다.
 - 다른 앱들을 연 후 당신의 앱을 실행시키면 시스템은 앱과 앱의 종속성들을 부분적으로 축출(?)[evict] 할 것입니다. 이건 보통의 유저 사용 행태를 반영한 상황 예시입니다.
 - 아주 큰 앱을(예를들어 많은 양의 그래픽 리소스를 사용하거나 실시간 카메라 입력을 받는 것들) 사용한 후 당신의 앱을 실행시켜 보십시오. 시스템은 당신의 앱의 프로세스를 종료시키려 할 가능성이 높습니다. 이것은 당신의 앱이 다음번 실행될 동안 많은 앱들을 페이징 해야 한다는 것을 뜻합니다.

![2](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/reducing_your_apps_launch_time/reducing-your-app-s-launch-time-2.png?raw=true)

UIKit은 메인 쓰레드에서 뷰를 그리고 유저의 이벤트를 처리합니다. 따라서 메인 쓰레드는 앱의 launching이 끝날 시점에 첫 프레임을 그릴 수 있어야만 합니다. 즉, Instruments의 thread trace 에서 나타난 메인 쓰레드가 작업을 수행하거나 선점(?)[preempted]되는데 걸리는 시간 동안 뷰를 그리지 못하거나 유저의 입력 이벤트에 응답하지 못한다는 것을 의미합니다.

앱 launch의 다른 부분을 보기 위해 Time Profile template를 사용해 앱을 프로파일링 할 수 있습니다. 앱 수명주기 타임라인은 앱이 lauching되는 중의 활동을 프로세스 초기화, UIKit 초기화, UIKit 초기 화면 렌더링 그리고 초기 프레임 렌더링으로 나눕니다.

![3](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/reducing_your_apps_launch_time/reducing-your-app-s-launch-time-3.png?raw=true)

<br/>

## Reduce Dependencies on External Frameworks and Dynamic Libraries

시스템은 당신의 코드가 실행되기 전에 앱의 실행파일과 앱이 의존하고 있는 라이브러리를 찾아 로드해야만 합니다.

Dynamic loader(dyld)는 앱이 필요로 하는 framework와 dynamic library를 찾기 위해 앱의 실행파일을 로드하고 실행파일의 Mach 로드 커멘드를 검사합니다. 그 후엔 각각의 framwork들을 메모리에 로드하고 dynamic library의 적저할 주소를 가리키기 위해 실행파일의 dynamic symbol을 resolve 합니다.

앱이 로드하는 써드 파티 프레임워크 각각은 lauchin time을 늘리게 됩니다. dyld는 이 수 많은 작업들을 유저가 앱을 설치할 때 launch closure에 캐싱하지만, launch closure의 크기와 로딩 후에 작업량은 여전히 library의 수와 크기에 달려있습니다. 따라서 당신은 써드 파티 framework의 개수를 줄임으로서 app의 launch time을 줄일 수 있습니다. 앱에 link된 framework와 Xcode의 Target editor에 설정된 library들에 import하거나 추가한 프레임워크 또한 이 수에 포함됩니다. 반면에 CoreFoundation과 같은 기본 제공 framework는 동일한 framework를 사용하는 다른 프로세스들과 공유된 메모리를 사용하기 때문에 lauch에 time에 미치는 영향이 훨씬 적습니다.

<br/>

## Remove or Reduce the Static Initializers in Your Code

iOS가 앱의 main 함수를 실행하기 전에 실행되어야만 하는 코드는 launch time을 늘립니다. 예를 들어 :

 - C++ static 생성자
 - 클래스 혹은 카테고리에 정의되어 있는 Objective-C 함수 로드
 - clang attribute \_\_attribute__((constructor))로 표시된 함수
 - 앱 또는 framework binary의 \_\_DATA,_\_mod\_init\_ 섹션에 linke된 모든 함수

가능하다면 앱이 launching을 끝낸 후, 하지만 작업 결과가 필요해 지기전인 앱 라이프 사이클의 나중 단계로 코드를 이동 시키기 바랍니다. Instruments의 Static Initializer Calls는 앱이 static initializer를 실행하는데 걸리는 시간을 측정해 줍니다.

![4](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/reducing_your_apps_launch_time/reducing-your-app-s-launch-time-4.png?raw=true)

<br/>

## Move Expensive Tasks Out of Your Application Delegate

많은 자원을 소모하는(비싼) 작업을 뒤로 미루기 위해 초기화 코드들을 검사해보십시요. 시스템은 lauch cycle 동안 필요한 작업을 할 수 있도록 AppDelegate 함수를 호출합니다. 이 함수들은 메인 쓰레드에서 동기적으로 실행되며, lauch cycle은 이 함수가 성공적으로 반활 될 때까지 끝나지 않습니다. 결국 이런 함수에서 당신이 수행하도록 하는 비싼 작업들은 lauch cycle을 늦추게 되는 것입니다.

UIKit은 AppDelegate class(UIApplicationDelegate 프로토콜을 구현하는 클래스)를 초기화하고 `application(\_:willFinishLauchingWithOptions:)`와 `application(\_:didFinishLauchingWithOptions:)`에 메세지를 보냅니다. UIKit은 이 메세지들을 메인 쓰레드 위에서 보내며, 이 메소드들 에서 코드를 싱행하며 보내는 시간은 앱의 launch time을 증가시키게 됩니다. 부디 앱의 첫 화면을 띄우기 위한 필수적인 작업들만 이 메소드에서 수행하고, 나머지는 보다 적당한 시간에 수행되도록 미루시기 바랍니다.

컨텐츠가 리프레시 되는 동안 오래된 컨텐츠를 표시해도 되는 경우, 네트워크 서비스를 이용한 데이터 동기화는 앱이 실행될 때 까지 연기시키는게 좋습니다. 동기화 작업을 비동기 백그라운드 큐로 보내십시요. 네트워크 서비스로 부터 업데이트 사항을 불러오기 위한 백그라운드 테스크를 등록하여 launch time에 데이터를 불러오는 데 필요한 작업량을 줄이십시요.

단순한 앱 lauch가 아닌 앱을 처음 사용할 때는 데이터 저장소나 위치 서비스 같이 뷰가 없는 것들을 초기화 시키십시요. 초기 뷰를 표시하기 뒤한 필수 데이터 만을 불러오기 바랍니다. 앱이 상태를 복원중인지 확인하고 뷰를 복원하는데 필요한 데이터를 준비하십시요. 만약 상태를 복원중인게 아니라면 default한 초기 뷰만을 준비하는게 좋습니다. 예를들어, 여러 이미지 썸네일을 부여주고 유저가 선택한 사진에 대해 구제적인 뷰를 보여주는 사진 캘러리 앱이 있다고 가정해 보겠습니다. 만약 앱이 복원되지 않은 상태에서 lauch 됐다면 처음엔 placeholder 이비지만을 보여주고 실제 이미지 썸네일은 앱의 lauching이 끝난 뒤 부터 채워나가면 됩니다. 그리고 유저가 썸네일을 선택하기 전까지는 원본 이미지를 불러올 필요가 없습니다.

초기 실행시 viable(?)한 앱의 제한된 일부분만 초기화 하십시요. 예를들어, task manager 앱은 앱이 유저의 모든 task정보를 데이터 저장소나 네트워크 서비스로부터 받지 못한 상태이더라도 유저가 task를 생성하고 실행할 수 있도록 할 수 있을것입니다.