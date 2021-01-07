# 또 다시 말해요
틀려도 괜찮습니다. 
계속해서 다시 한 번 말하다보면,
다시 한 번 유창하게 말할 수 있을거에요!

## 주소
> https://www.ddomal.com/
> - Chrome 브라우저, 스마트폰은 안드로이드 계열에서만 동작합니다

## 소개
실어증을 겪고 계신 분들을 위한 의사소통 연습 앱 이에요.
현재는 문장을 듣고서 큰 무리없이 이해하고 읽는 능력이 보존되어 계신 명명실어증(Anomic aphasia) 환우 분들을
대상으로 만들어졌어요.

## 사용방법
### 문장만들기
```
시작하기!  
풀 문제 갯수 고르기!  
단어를 보고 마이크 버튼을 눌러 나만의 문장을 만들기!  
예시문을 보면서 문장 확인하기  
```

### 듣고 이해하기
```
시작하기!  
풀 문제 갯수 고르기!  
플레이 버튼을 누르고 문제 듣기!  
문제를 잘 듣고 예 / 아니오 고르기! (얼마든지 다시 들을 수 있어요)  
정답 확인하기!  
```
## 프로젝트 지식 위키
[사용자 스토리](https://github.com/CodeSoom/ddomal/wiki/%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%8A%A4%ED%86%A0%EB%A6%AC)
[용어 사전](https://github.com/CodeSoom/ddomal/wiki/%EC%9A%A9%EC%96%B4-%EC%82%AC%EC%A0%84)

## Project Setting

### Install npm dependencies

```bash
> npm install
```
### Start dev-server

```bash
> npm start
```

### Run tests

- e2e test
```bash
> npm test:e2e
```

- unit test
```bash
> npm run test:unit
```

### Run build project

```bash
> npm build
```

### Run Lint

```bash
> npm run lint
```

### Run Coverage

```bash
> npm run coverage
```

### .env file

```bash
> AWS_ID='your aws identity pool id'
> AWS_REGION='your aws region'
```

#### Using AWS Identity pool
https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html
