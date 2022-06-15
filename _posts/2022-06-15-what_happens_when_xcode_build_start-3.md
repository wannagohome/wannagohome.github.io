---
title: "Xcode build를 시작하면 어떤일이 벌어질까? - (3)"
categories:
  - Build structure
tags:
  - build
  - xcode
published: true
---

![1](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/what_happens_when_xcode_build_start/1.png?raw=true)

<br/>

소스코드가 오브젝트 파일로 바뀌는 과정을 먼저 살펴보려는 계획이었으나, 당장 필요한 지식을 습득하기 위해 Linker영역에서 일어나는 일들을 먼저 알아보겠습니다.

<br/>

# Linker

오브젝트들이 어떻게 링킹되고, executable로 만들어지는 지 알아보기 위해선 먼저 Linker에 대해 알아야 하겠습니다.

Linker는 빌드 과정중 가장 마지막 과정에 동작합니다. 크게 두가지 input을 받아 link하고 executable을 만들어 내는데 clang과 swiftc로 만들어진 오브젝트 파일(.o)과, .dylib, .tbd, .a와 같은 라이브러리 파일입니다.

여기서 중요한 것은 링커는 소스를 생성해내지 않는 다는 것입니다. Linker는 소스를 이동시키도 이어 붙일 뿐 코드를 생성해 내지 않습니다.

<br/>

# Symbol

Symbol은 단순하게 코드 조각을 참조하기 위한 이름입니다. 이 코드 조각는 또 다른 symbol을 참조할 수도 있습니다. 함수가 또 다른 함수를 호출 하는 것 에서 이런 상황을 볼 수 있습니다.

모든 코드 조각은 symbol로 나타내어 집니다. 앞으로 살펴볼 예시의 모든 함수도 마찬가지 입니다. 코드 조각은 undefined symbol을 참조 할 수 있는데 예를들어, 오브젝트 파일이 다른 오브젝트 파일의 함수를 참조할 때 그리고 그 참조된 오브젝트 파일이 undefined일 때, 링커가 undefined symbol들을 찾아 링킹 합니다.

Symbol은 링커 동작에 영향을 주는 속성을 가질 수도 있습니다. 예를 들어 weak sybol의 경우 사용가능한 API Level을 제한시킬 수 있습니다.

<br/>

# Library

Library는 빌드하고자 하는 타겟의 일부가 아닌 symbol을 정의하는 파일입니다. Library에는 몇가지 종류가 있는데


### Dylib: Dynamic library
dynamic library는 executable이 이용할 수 있도록 코드와 데이터 조각을 노출 시키는 Mach-O 파일 이라고 할 수 있습니다. dymaic libaray는 system의 일부의 형태로 배포가 되는데, apple에서 제공하는 대부분의 framework는 dynamic library 형태로 제공되고 있습니다.

### TBD: Text Based Dylib Stub
이름 그대로 텍스트 기반의 dynamic library stub 파일 입니다. 우리는 여러가지 프레임 워크를 사용하지만 사이즈가 너무 크기 때문에 그 안의 모든 코드를 복사해 오는 것을 원하지는 않습니다. 심지어 컴파일러와 링커는 그 구현에 대해 알아야할 필요도 없습니다. 그저 실행 할 수만 있으면 될 뿐이죠. 따라서 TBD라는 dylib stub을 만들어 symbol의 body를 모두 지우고 이름만 가지고 있는 것입니다.

### Static archive
Static archive(혹은 static library)는 오브젝트 파일의 모음(collection or archive)일 뿐입니다. .a format은 UNIX에서 더 강력한 format이 나오기 전에 사용되던 archive format입니다. 하지만 당시 컴파일러와 링커가 이 foramt을 native하게 읽을 수 있었기 때문에 계속 사용되고 있을 뿐입니다.

