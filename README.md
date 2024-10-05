# Spring Security Login / JWT Token Access


------------------------


### 사용 기술 환경
#### Backend
![Java](https://img.shields.io/badge/Java-17-brightgreen?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.8-brightgreen?style=for-the-badge&logo=springboot&logoColor=white)
![JPA](https://img.shields.io/badge/JPA-Enabled-yellow?style=for-the-badge)
![Spring Security](https://img.shields.io/badge/Spring%20Security-Enabled-green?style=for-the-badge&logo=springsecurity&logoColor=white)


#### Frontend
![React](https://img.shields.io/badge/React-Enabled-blue?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-Enabled-yellow?style=for-the-badge&logo=javascript&logoColor=white)


#### DB
![Oracle 21c](https://img.shields.io/badge/Oracle%2021c-Enabled-red?style=for-the-badge&logo=oracle&logoColor=white)



-----------------------

# Spring Security Login


## 1. 사용자 권한 로그인


![image](https://github.com/user-attachments/assets/d3bf23f6-15d5-4d10-ab63-6b12fb50f74c)


#### 로그인 시 서버로 전송되는 값 콘솔 로그


![image](https://github.com/user-attachments/assets/8a094bc8-e684-4278-b55f-59cc9e27e349)


#### 로그인 시 알림창으로 사용자 닉네임 출력하기


![image](https://github.com/user-attachments/assets/ab1352d1-13c1-4903-bc4f-3f10942caa27)


#### 로그인 성공 시 세션에 사용자 정보 담기


![image](https://github.com/user-attachments/assets/49a87323-5326-4d1d-9ef2-c8ef1420cc3d)


#### 로그인 후 쿠키 정보 확인




----------------------------




## 2. 사용 권한


![image](https://github.com/user-attachments/assets/1ba2225a-fc51-4f2e-9b76-6c6a0c290d18)


#### URL에 하드코딩으로 관리자 페이지 진입 시도 시


![image](https://github.com/user-attachments/assets/f92c47e8-c1a8-41b0-97a1-396a95995aad)


#### 관리자 권한이 필요하다는 페이지 2초간 노출 후 다시 mainhome 페이지로 이동




----------------------




## 3. 로그아웃


![image](https://github.com/user-attachments/assets/3ed02996-e049-431e-acfa-86d4b17b95be)


#### 로그아웃 시 쿠키 정상 삭제



------------------------------




## 4. 자동로그인 리멤버미


![image](https://github.com/user-attachments/assets/fd5f3e73-9017-4dc3-9041-0d98d1b05a54)


![image](https://github.com/user-attachments/assets/3491a64a-0fca-462e-824d-62947057a795)


#### 자동 로그인 선택 후 로그인 시 RememberMe 쿠키 저장




-------------------------




## 5. 관리자 페이지


![image](https://github.com/user-attachments/assets/f5435b15-4b71-4fb0-8596-2c91df0d92f6)


#### 일반 사용자 접근을 막아두었던 admin 페이지에 자유롭게 접속하는 관리자



-------------------------




## 6. 회원가입


![image](https://github.com/user-attachments/assets/f2e2db1e-6c04-40f4-91df-bf01b9af7a83)


#### 비밀번호 확인 유효성 검사


![image](https://github.com/user-attachments/assets/49c43559-a12d-4bac-a592-bf48d167e5fb)


#### 회원가입 성공시 알림


![image](https://github.com/user-attachments/assets/e10b6d41-7536-40ab-a70c-f704ab568a45)


#### 가입한 아이디로 로그인 완료




-------------------------




## 7. 암호화 저장

![image](https://github.com/user-attachments/assets/f5f3f186-86ef-4d83-a340-8ca9d7bef18b)


#### 방금 전 회원 가입한 user3의 비밀번호가 Security로 인해 암호화되어 DB에 저장된 것을 확인
#### 로그인 시에는 이 암호화된 비밀번호를 복호화한다다




-------------------------




# JWT Token Access


## 1. 사용자 로그인 시 Token 발급


![image](https://github.com/user-attachments/assets/70876bb9-c735-4bea-bc9b-aa4c75c0ee86)


#### 로그인 시 Header 정보에 Token이 발급된 것을 확인




-------------------------




## 2.사용자 요청 보내기


![image](https://github.com/user-attachments/assets/479bbfe9-1396-45dc-8a83-1d56bb9305e6)


#### /user/... 로 시작하는 Ajax 요청을 보내면


![image](https://github.com/user-attachments/assets/18375db7-5b44-4600-be8e-c90d6e2ae4f7)


#### 서버는 토큰을 확인 후 로그인한 사용자에게 응답을 보냄


![image](https://github.com/user-attachments/assets/4f146be0-258f-4b7b-bf8d-a1d09c64166d)


#### /user/... 로 시작하는 Ajax 요청확인 PostMan : 200 (로그인한 모든 사용자 승인)


![image](https://github.com/user-attachments/assets/3f8f4212-c7c5-4a26-9fa7-13de313d72c8)


#### /admin/... 로 시작하는 Ajax 요청확인 PostMan : 403 (관리자에게만 승인) 




-------------------------




## 3.관리자 요청 보내기


![image](https://github.com/user-attachments/assets/65965eee-b856-4423-8a9e-d7d0437d9071)


#### 관리자 계정으로 접속하여 /admin/... 로 시작하는 Ajax 요청을 보내면


![image](https://github.com/user-attachments/assets/299e10e8-0992-4ff9-8a87-df571ea8d94f)


#### 서버는 토큰을 확인 후 로그인한 사용자(관리자)에게 응답을 보냄


![image](https://github.com/user-attachments/assets/c68dbbc3-597f-4ae1-bb89-70e184cfbd81)


#### 관리자 계정으로 접속하여 /user/... 로 시작하는 Ajax 요청확인 PostMan : 200 (로그인한 모든 사용자 승인)


![image](https://github.com/user-attachments/assets/18c8ea23-ee87-4711-b227-4cff01ece2f2)


#### 관리자 계정으로 접속하여 /admin/... 로 시작하는 Ajax 요청확인 PostMan : 200 (관리자에게만 승인)




