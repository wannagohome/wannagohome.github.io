---
title: "[doc] Mach-O에 대해 알아보자 -1"
categories:
  - Build structure
tags:
  - build
  - xcode
published: true
---


<br/>

Mach-O는 MacOS 바이너리의 executable format 입니다. 그리고 executable format은 메모리에 올리가는 바이너리 파일의 코드와 데이터의 순서를 결정합니다. 이 때, 코드와 데이터의 순서는 메모리 사용과 페이징 활동에 영향을 미치므로 프로그램 성능에 직접적인 영향을 미치게 됩니다.

프로그램을 만들기 위해서는 소스코드를 오브젝트 파일로 만들어야 합니다. 오브젝트 파일은 executable 코드 혹은 static library로 패키징 되는데, MacOS는 이렇게 소스코드를 어플리케이션이나 라이브러리로 만드는 도구를 제공합니다.

## Types of Mach-O File
- **Intermediate object file**
  - 이 파일은 큰 오브젝트 파일의 기본적인 building block일 뿐 최종 결과물의 형태는 아닙니다. 보통의 경우 컴파일러는 하나의 input 소스 코드 파일로 부터 하나의 오브젝트 파일을 만들고, static linker를 사용해 오브젝트 파일들을 dynamic linker로 결합합니다.

- **Dynamic shared library**
  - dynamic library는 어플리케이션이 동적으로 참조하고 있고, 앱이 실행 될때 dynamic linker에 의해 로드되는 executable code의 모듈을 포함하고 있습니다.


- **Framework**
  - MacOS에서 Framework는 특정한 구조를 따르는 디렉토리를 이야기 합니다. shared library와 여러 리소스들을 포함하고 있습니다.
  
- **Static archive library**
  - static library는 static linker가 빌드 타임에 어플리케이션에 추가할 수 있는 코드의 모듈을 포함하고 있습니다.


#### *<u>ref.</u>*
[Overview of the Mach-O Executable Format](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/CodeFootprint/Articles/MachOOverview.html)
[Building Mach-O Files](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/MachOTopics/1-Articles/building_files.html#//apple_ref/doc/uid/TP40001828-SW1)
[What are Frameworks?](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html#//apple_ref/doc/uid/20002303-BBCEIJFI)