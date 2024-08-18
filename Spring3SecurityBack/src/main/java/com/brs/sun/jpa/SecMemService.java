package com.brs.sun.jpa;

import java.util.Optional;

public interface SecMemService {
	/**
	 * 로그인 이후 회원 정보 조회
	 * @param id
	 * @return Optional<SecMemEntity>
	 */
	public  Optional<SecMemEntity> getUserInfo(String id);
	
	/**
	 * 회원 가입
	 * @param sme
	 * @return SecMemEntity
	 */
	public SecMemEntity register(SecMemEntity sme);
}
