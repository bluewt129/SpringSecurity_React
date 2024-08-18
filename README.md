# Spring Security Login


---------------------


### 사용 기술 환경

Backend : Java17, SpringBoot, JPA, Spring Security

Frontend: React, Javascript

DB : Oracle


-----------------------


## 1. 사용자 권한 로그인


![image](https://github.com/user-attachments/assets/d3bf23f6-15d5-4d10-ab63-6b12fb50f74c)


#### 로그인 시 서버로 전송되는 값 콘솔 로그


![image](https://github.com/user-attachments/assets/8a094bc8-e684-4278-b55f-59cc9e27e349)


#### 로그인 시 알림창으로 사용자 닉네임 출력하기


![image](https://github.com/user-attachments/assets/6ee5982d-6c38-4f83-a5b9-ff626eec0a43)


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




