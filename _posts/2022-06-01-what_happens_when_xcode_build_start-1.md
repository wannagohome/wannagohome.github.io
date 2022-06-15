---
title: "[WWDC] Xcode build를 시작하면 어떤일이 벌어질까? - (1)"
categories:
  - Build structure
tags:
  - build
  - xcode
published: true
---

![1](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/what_happens_when_xcode_build_start/1.png?raw=true)

<br/>

먼저는 Xcode의 Build Process에 대해 살펴보고, 다음으로 컴파일러 영역으로 넘어가 소스코드가 어떻게 오브젝트 파일로 빌드되는지 살펴보겠습니다. 마지막으로 linker에 대해 살펴보며 심볼과 소스코드의 상관관계, 컴파일러를 통해 만들어진 오브젝트 파일들로 실행파일로 만들어내는 과정에 대해 살펴 보겠습니다.

<br/>

# Xcode Build System

<br/>

### Build Process

앱을 빌드하는데는 수많은 과정들이 필요하고 대부분의 프로세스는 command line tool로 수행하게 됩니다. 이 툴들은 특정 argument를 가지고 특정 순서를 따라 실행되어야만 하는데, build system은 이 과정들을 자동화 해줍니다.

잠시 빌드 과정의 순서에 대해 이야기 해보자면, 이 순서는 읽어야할 input과 만들어 내야할 output과 같은 depedency 정보에 의해 결정됩니다. 예를 들어 컴파일 작업은 *.m과 같은 소스코드 파일을 input으로 받아 *.o와 같은 오브젝트 파일을 output으로 만들어 내죠. 이와 비슷하게 linker 작업도 여려개의 오브젝트 파일들을 input으로 받고, 실행 파일 혹은 libary 형태로 output을 만들어냅니다.

이런 일련의 작업 과정은 다음과 같이 간단한 그래프로 나타낼 수 있는데, 이 때 각 작업들은 서로 독립적으로 수행됩니다. 그리고 다시 정리해 보자면 build system은 dependency 정보를 가지고 작업의 순서를 결정합니다.
![2](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/what_happens_when_xcode_build_start/2.png?raw=true)

<br/>

지금까지 build 프로세스란 어떤것인지 간랴갛게 살펴보았습니다. 이제 조금 구체적으로 어떻게 동작하는지 살펴보죠.

![3](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/what_happens_when_xcode_build_start/3.png?raw=true)

빌드를 시작하면 build system은 Xcode 프로젝트 파일로 부터 프로젝트에 포함된 파일, 타겟 의존 관계등을 읽어내고 directed graph라는 tree형태의 구조를 만들어 냅니다. 이 그래프는 input, output파일과 process하기 위한 작업들 사이의 모든 의존관계들을 나타냅니다. 이를 통해 어던 순서로 작업이 수행되어야 하며, 어떤 작업들이 평행하기 수행될 수 있는지를 파악하고, 작업을 수행합니다.

<br/>

### Incremental Build

프로젝트를 빌드는 지금까지 살펴본것과 같이 수많은 작업들을 필요로 하며, 프로젝트가 커질 수록 빌드를 위한 시간을 길어질것입니다. 이런 프로젝트 빌드를 매번 반복하는 것은 너무나 많은 시간을 소요하게 되는데, 이런 비효율 성을 줄이고자 build graph에 꼭 필요한 부분만 빌드하는 incremental build라는 기능을 제공합니다.

build graph의 각 작업들은 각자의 서명을 가지고 있는데 build system은 이 서명을 과거 빌드와 비교하고 어떤 부분이 새롭게 빌드되어야 하는지 파악하고 변경된 부분의 작업만을 수행하는 것입니다.


### Where Do Dependencies Come From?

build process는 결국 여러 작업들을 특정 순서태로 수행하는 일련의 과정입니다. 하지만 이 순서들은 build system이 build graph를 이용해 맞춰주기 때문에  개발자는 이에 대해 신경쓸 필요가 없습니다. 우리가 신경써야 할 것은 의존성입니다. build sytem이 작업을 올바른 순서를 따라 병렬적으로 수행 하도록 해서 멀티코어를 최대한 활용하는 것이지요.

그럼 이런 의존성은 어디서 올까요? (build system은 어디로 부터 의존성에 대한 정보를 얻을까요?)

##### Built in
![4](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/what_happens_when_xcode_build_start/4.png?raw=true)

특정 작업의 경우 build system에 내장된 정보에서 종속성 정보를 가져옵니다.

##### Target Dependencies 
타겟 의존성은 말그대로 특정 타겟을 의존하여 내가 빌드하려는 타겟이 빌드되기 전에 먼저 빌드되어야 하는 의존성을 이야기 합니다. 의존성이 있어 먼저 빌드되어야 하지만 Xcode 10 이후 부터는 적용된 build system에서는 의존성 없이 빌드할 수 있는 일부분에 대해서 병렬적인 빌드가 가능합니다.
이런 타겟 의존성은 명시적 의존성과, 암시적 의존성으로 나뉩니다.

##### Explicit Dependencies
![5](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/what_happens_when_xcode_build_start/5.png?raw=true)

타겟 의존성을 명시적으로 나타낸 것입니다.

##### Implicit Dependencies
![6](https://github.com/wannagohome/wannagohome.github.io/blob/master/assets/images/what_happens_when_xcode_build_start/6.png?raw=true)

동일한 프로젝트 혹은 workspace에 있는 타겟의 경우 의존성이 명시되어 있지 않더라도  Xcode가 스스로 필요한 타겟 의존성을 감지할 수 있는데 이것을 암시적 의존성이라 합니다.

<br/><br/>

#### *<u>ref.</u>*
[Behind the Scenes of the Xcode Build Process](https://developer.apple.com/videos/play/wwdc2018/415)