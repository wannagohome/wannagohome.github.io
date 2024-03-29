---
title: "Tuist를 적용하며 배운것들"
categories:
  - Programming
tags:
  - Tuist
published: true
---

최근 회사에서 프로젝트에 Tuist를 적용하는 업무를 맡게되었습니다. 그 과정중에 예상치 못한 난관들을 겪게되면서 많은 것들을 배우고 익힐 수 있었는데요. 지금도 휘발되고 있는 기억들을 어떻게든 붙잡아 보고자, Tuist를 적용하는 과정에서 배운 것들과 고민했던 것들을 나열해보고자 합니다.

#### Swift Package Manager
 - 패키지를 만드는(선언하는) 법  /  _조금더 자세하게한 부분을 익힐 수 있었다_
 - 하나의 타겟에는 서로 다른 언어가 섞일 수 없다
 - 헤더를 사용하는 ObjC, ObjC++, C++과 같은 언어는 반드시 퍼블릭 해더가 필요하다
 - 하나의 소스파일을 여러 타겟에 중복해서 포함 시킬 수 없다  / _매우 불편했던 부분_
 - 리소스 번들에 접근하기 위해서는 SPM이 자동으로 생성해 주는 internal 소스를 사용해야만 한다  /  _이것도 불편했던 부분_

<br/>

#### Static framework vs Dynamic framework
 - 글로만 머리속에 담아두었던 이 둘의 차이를 더 확실하게 이해하게 되었다
   -  성능차이가 왜 발생하는지 알게 되었다
   -  Dynamic framework가 다른 곳에도 사용되는 Static framework를 의존하게 하는 것은 피해야 한다


#### Build Setting
- 여러가지 build setting에 대해 알게되었다.
  - ONLY_ACTIVE_ARCH, EXCLUDED_ARCHS, MACH_O_TYPE, OTHER_LDFLAGS, FRAMEWORK_SEARCH_PATHS, GCC_PREPROCESSOR_DEFINITIONS, SWIFT_ACTIVE_COMPILATION_CONDITIONS 등등....


---

#### 고민
 - 외부 의존성은 어떻게 관리되어야 하는가?
 - static / dynamic framework 어떤 상황에서 어떤것을 선택해야 할까?
   - 모든 것을 static으로 만들어도 괜찮을까?
   - resource는 어떻게 관리해야할까?
   - preview를 그리기 위해선 dynamic framework가 필요하다. 오직 preview만을 위한 dynamic framework target을 만들고 관리하는게 얼마나 실효성이 있을까?
 - 어떤 모듈 구조가 이상적일까?
   - feature는 어떤 단위로 나우어야 하나?
 - 동료들이 불편해 하진 않을까?
   - 어떻게 하면 tuist를 이용한 프로젝트 관리를 어색해 하지 않도록 도울 수 있을까?
   - 전혀 신경쓸 필요가 없도록 만드려면 어느 수준까지 template화가 되어 있어야 할까?

<br/><br/>