---
title: "arm64-simulator binary가 sdk를 의존할 때 m1 simulator 환경에서 빌드하기"
categories:
  - Xcode
tags:
  - binary
  - build setting
published: true
---

최근 참여하고 있는 프로젝트의 dependency manager를 cocoapod에서 spm으로 변경하는 작업을 진행하게 되었습니다. 단순하게 pod을 제거하고 swift package로 대체하려 하려 했지만, 몇 가지 문제가 발생하여 이 문제점을 해결해 나가는 과정을 정리해보았습니다.

----

<br/>

지금은 맥의 모든 라인업에서 애플 실리콘 제품이 출시되기도 했고, 거의 대부분의 소프트웨어도 arm64 아키텍쳐에 대응하는 제품을 출시하며 호환성 문제가 거의 사라져 가고있는 것 같습니다. 하지만 여전히 업데이트가 이루어 지지 않고 있는 소프트웨어도 조금 남아있는 상황입니다.

개발을 하다보면 여러가지 도구를 사용하게 되는데, 대부분의 경우 공개되어 있는 소스코드를 모듈 형태로 의존하게 됩니다. 하지만 소스코드가 아닌 바이너리를 제공하는 경우도 있는데, 이 바이너리가 앞서 이야기 했던 업데이트가 이루어지지 않았을 경우, 즉, arm64에 대한 대응이 없을 경우 문제가 될 수 있습니다. (arm64-ios-simulator binary가 없는 경우)

<br/>

### 문제점

이제 많은 개발자들이 애플 실리콘 맥으로 개발을 하지만, iOS 시뮬레이터는 아직 x86_64 아키텍쳐를 지원합니다. 따라서 x86_64 아키텍처를 사용하여 빌드하면 arm64 바이너리가 없는 의존성을 사용하더라도 빌드에 성공할 것입니다. 실제로 build setting에 EXCLUDED_ARCHS로 arm64를 설정하면 아무런 문제없이 빌드 됩니다.

하지만 이 방법은 여전히 몇 가지 문제점을 내포하고 있습니다.

- 디버깅 속도 저하
  - 애플 실리콘 맥으로 x86 아키텍처 빌드를 할 경우 다음과 같은 경고를 볼 수 있습니다.
`Warning: Error creating LLDB target at path using an empty LLDB target which can cause slow memory reads from remote devices.` 사실 인텔맥에서 arm64 아키텍처로 빌드할 경우에도 동일하게 표시되는데, cpu의 아키텍쳐와 빌드하는 아키텍쳐가 다를 경우 LLDB 성능이 저하 될 수 있습니다.

- SPM 사용의 어려움
  - 몇가지 패키지의 경우 x86 빌드를 강제하면 다음과 같은 에러가 발생합니다.
![1](/assets/images/build_app_with_arm64_simulator_without_arm64_simulator_binary/1.png){: width="80%" }{: .center}
swiftmodule안에 x86 타겟이 포함되지 않아 모듈을 찾지 못한것입니다.

<br/>

### 시도(실패)

문제가된 SDK의 경우 cocoapod으로 제공이 되고 있었고, podspec에서 부터 EXCLUDED_ARCHS로 arm64가 지정되어 있었기 때문에 pod을 사용하는 것이 아닌 framwork를 직접 참조하도록 해보았지만, 역시나 실패하였습니다. xcode는 arm64-ios-simulator binary를 찾아보았지만 발견하지 못했으니 당연하겠죠.

<br/>

### 해결

따라서 static linker가 바이너리를 찾지 못해도 넘어가도록 하는 방법이 필요했고, 해결책은 단순했습니다. 제공되는 framwork를 xcframework로 만들고, 해당 의존성을 사용하는 코드를 전처리기로 제외시키는 것입니다. 아직 정확한 이유를 파악하진 못했지만, fat framework를 xcframework로 만들어 사용하니, static linker가 warning을 내뱉긴 하지만 binary가 없다고 fail 시키진 않았습니다.

fat framework를 xcframework로 만드는 방법은 간단합니다. xcframwork는 아이폰용, simulator용 바이너리가 각각 필요하기 때문에 하나의 fat framework로 두 바이너리를 추출해 만들고 합치는 것입니다.

fat framework를 복사하여 두 개로 만든 뒤, 아이폰용으로 사용할 framwork의 info.plist의 CFBundleSupportedPlatforms를 iPhoneOS로 설정하고 이 바이너리를 `lipo -extract`로 arm64 바이너리만 추출합니다.

simulator용으로 사용할 frmawork의 info.plist의 CFBundleSupportedPlatforms은 iPhoneSimulator로 설정하고 `lipo -extract` x86_64 바이너리만 추출 합니다.

이 두 바이너리를 `xcodebuild -create-xcframework`로 xcframework를 만들면 끝입니다.

물론 xcframework로 만들었다고 해서 바로 빌드가 되진 않고 해당 의존성에서 제공하는 코드들은 제외시켜야 symbol을 못찾았다고 fail이 나지 않습니다.



<br/><br/>

#### *<u>ref.</u>*
[Weak Linking](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WeakLinking.html)