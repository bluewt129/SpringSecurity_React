package com.brs.sun.jpa;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SecMemServiceImpl implements SecMemService {

	private final SecMemRepository repository;

	@Override
	public Optional<SecMemEntity> getUserInfo(String id) {
		return repository.findUserById(id);
	}

	@Override
	public SecMemEntity register(SecMemEntity sme) {
		return repository.save(sme);
	}

}
