package com.brs.sun.jpa;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class SecMemController {
	
	@Autowired
	private SecMemService service;

	@Autowired
	private PasswordEncoder passwordEncoder;

	
	//로그인
	@GetMapping("/loginOk")
	public ResponseEntity<Map<String, String>> loginOk(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		String id = authentication.getName();
		String role = authentication.getAuthorities().toString();
		Optional<SecMemEntity> sme = service.getUserInfo(id);
		String nickname = sme.get().getNickname();
		
		log.info("로그인한 유저 아이디 : {}", id);
		log.info("로그인한 유저 권한 : {}", role);
		log.info("로그인한 유저 닉네임 : {}", nickname);
		
		Map<String, String> login = createUserInfo(id, role, nickname);
		
		return ResponseEntity.ok(login);
	}
	
	//로그인 이후 정보 입력
	private Map<String, String> createUserInfo(String id, String role, String nickname) {
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("id", id);
        userInfo.put("role", role);
        userInfo.put("nickname", nickname);
        return userInfo;
    }
	
	//로그아웃 이후 컨트롤러
	@GetMapping("/logoutOk")
	public ResponseEntity<String> logoutOk() {
	    log.info("로그아웃 성공");
	    return ResponseEntity.ok("로그아웃 성공");
	}
	
	//로그아웃 실행 컨트롤러
	@PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath(request.getContextPath());
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        log.info("로그아웃 완료 {}", cookie);
        return ResponseEntity.ok().build();
    }
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody SecMemEntity entity) {
	    log.info("전달받은 가입 요청 값 : {}", entity);
	    log.info("암호화 전 비밀번호 값 : {}", entity.getPassword());

	    // 비밀번호를 암호화합니다.
	    String encodedPassword = passwordEncoder.encode(entity.getPassword());
	    log.info("암호화 후 비밀번호 값 : {}", encodedPassword);

	    // 암호화된 비밀번호를 엔티티에 설정합니다.
	    SecMemEntity e1 = SecMemEntity.builder()
	    		.id(entity.getId())
	    		.password(encodedPassword)
	    		.role("ROLE_USER").build();

	    // 서비스 계층을 통해 사용자를 등록합니다.
	    service.register(e1);

	    return ResponseEntity.ok("회원 가입 성공");
	}
	
	// 로그인 성공 후 자동 로그인 상태 확인
    @GetMapping("/checkRememberMe")
    public ResponseEntity<Map<String, String>> checkRememberMe(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        
        Map<String, String> response = new HashMap<>();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("rememberMe-cookie".equals(cookie.getName())) {
                    // Remember-me 쿠키가 존재하는 경우
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                    if (authentication != null && authentication.isAuthenticated()) {
                        String id = authentication.getName();
                        Optional<SecMemEntity> sme = service.getUserInfo(id);
                		String nickname = sme.get().getNickname();
                        response.put("id", id);
                        response.put("nickname", nickname); // 사용자 이름 등 추가 정보
                        response.put("role", authentication.getAuthorities().toString());
                        return ResponseEntity.ok(response);
                    }
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
	
}
