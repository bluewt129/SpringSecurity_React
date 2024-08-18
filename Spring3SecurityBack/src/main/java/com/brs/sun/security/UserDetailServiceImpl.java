package com.brs.sun.security;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.brs.sun.jpa.SecMemEntity;
import com.brs.sun.jpa.SecMemRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final SecMemRepository repository;
    
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        log.info("loadUserByUsername 실행 - 넘어온 아이디 : {}", id);
        
        SecMemEntity sme = repository.findUserById(id)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 찾을 수 없음 : " + id));

        return new org.springframework.security.core.userdetails.User(
                sme.getId(),
                sme.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(sme.getRole()))
        );
    }
}
