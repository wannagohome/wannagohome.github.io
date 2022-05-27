---
title: "[번역] What is framework?"
categories:
  - Build structure
tags:
  - framework
  - translation
---

<br/>

애플의 문서인 [Overview of Dynamic Libraries](http://www.google.co.kr)에 대한 번역 입니다.

<br/><br/>

# What is framework?

framework는 dynamic library, nib 파일, 이미지 파일, 로컬라이즈 파일 그리고 reference 문서와 같은 공유된 리소스들을 하나의 패키지 안에 포함하고 있는 계층화된 디렉토리 입니다. 여러개의 어플리케이션들은 이런 리소스들 전부를 동시에 사용할 수 있습니다. 시스템은 이 리소스들을 필요한 만큼 메모리에 로드하며, 하나의 복사본을 모든 어플리케이션들 사이에서 공유합니다.

framework는 bundle이기도 하며, Core Foundation Bundle 서비스나 Cocoa NSBundle 클래스를 사용해 접글 할 수 있습니다. 하지만 대부분의 bundle과는 다르게 framework bulde은 Finder에 파일 형태로 표시되지 않습니다. framework bundle은 유저가 탐색할 수 있는 표준 디렉토리입니다. 이는 개발자로 하여금 framework의 내용물을 탐색하고 문서나 헤더파일을 더 쉽게 볼수 있게 합니다.

Framework static, dynamic libaray와 동일한 목성을 수행하는데, 특정 작업을 수행하기 위해 어플리케이션으로 부터 호출될 수 있는 루틴 library를 제공합니다. 예를들어, Application Kit과 Froundation framework는 Cocoa 클래스와 메소드를 위한 인터페이스를 제공합니다. framework는 static, dynamic library에 비해 다음과 같은 이점을 가지고 있습니다.

- framework는 서로 연관이 있지만 분리되어 있는 리소스들을 그룹핑합니다. 이런 그룹핑은 리소스를 더 쉽게 설치, 제거, 탐색할 수 있게합니다.
- framework는 library에 비해 다양한 타입의 리소스를 가질 수 있습니다. 예를들어, framework는 관련된 헤더 파일과 문서를 포함할 수 있습니다.
- 여러 버전의 프렘워크가 하나의 번들안에 들어갈 수 있습니다. 이는 오래된 프로그램과의 호환을 가능하게 합니다.
- 얼마나 많은 프로세스가 특정 리소스를 사용하는지에 관계없이 단 하나의 read only 리소스 사본을 메모리에 상주시킵니다. 이러한 리소스 공유는 시스템의 메모리 사용량을 주리고 성능을 개선시킵니다.

> Note: framework가 프로그래밍 인터페이스를 제공하는 것은 필수가 아니며 리소스 파일만을 가지고 있을 수도 있습니다.

