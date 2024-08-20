package com.brs.sun.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.brs.sun.jpa.SecMemEntity;

public class CustomUserDetails extends User{

	private static final long serialVersionUID = 5202574540788694671L;
	
	private SecMemEntity sme;
	
	public CustomUserDetails(String id, String password, Collection<? extends GrantedAuthority> authorities) {
		super(id, password, authorities);
	}
	
	public CustomUserDetails(SecMemEntity sme) {
	    super(sme.getId(), sme.getPassword(),
	            Collections.singletonList(new SimpleGrantedAuthority(sme.getRole())));
	    this.sme = SecMemEntity.builder()
	            .id(sme.getId())
	            .nickname(sme.getNickname())
	            .role(sme.getRole())
	            .build();
	}

	
	public SecMemEntity getSecMemEntity() {
	    return sme;
	}

	public void setSecMemEntity(SecMemEntity sme) {
	    this.sme = sme;
	}

}
