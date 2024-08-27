# 아이랑 아이(AI)랑
공개 SW 개발자 대회 출품작인 **아이랑 아이(AI)랑**의 Front-End 레포지토리입니다.

## 요구사항
- Nodejs : v20.15.0

## 스택
<div align=center>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
    <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
    <img src="https://img.shields.io/badge/Create Reate App-09D3AC?style=for-the-badge&logo=createreactapp&logoColor=white">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/styled componentes-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white">
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    <img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white">
    <img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=.env&logoColor=black">
    <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
    <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
</div>

## 설치 및 실행 방법
### 1. Git Clone
~~~ bash
git clone https://github.com/KOBOT-13/2024OpenSW-FRONT.git
cd 2024OpenSW-FRONT
~~~
### 2. React Package Update
~~~ bash
npm install
~~~
### 3. Create .env
~~~ bash
vi .env
REACT_APP_API_ADDRESS = http://{SERVER_IP_ADDRESS}/api/
REACT_APP_ADDRESS = http://{SERVER_IP_ADDRESS}
:wq
~~~
### 4. Start Project
~~~
npm start
~~~

## 프로젝트 구조
```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂forms
 ┣ 📂hooks
 ┣ 📂screens
 ┣ 📂services
 ┣ 📜App.css
 ┣ 📜App.js
 ┗ 📜index.js
 ```

 - assets : 폰트, 웹 로고 이미지 파일 등 웹사이트에 사용될 정적 리소스를 저장하는 데 사용
 - components : 재사용 가능한 컴포넌트들이 위치하는 폴더
 - forms : 
 - hooks : 커스텀 훅이 위치하는 폴더
 - screens : 웹사이트 각각의 스크린 파일이 위치하는 폴더
 - services : api 관련 파일이 위치하는 폴더