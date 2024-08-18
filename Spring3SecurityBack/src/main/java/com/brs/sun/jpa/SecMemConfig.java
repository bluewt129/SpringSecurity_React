package com.brs.sun.jpa;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecMemConfig {
	
	//@Bean
	CommandLineRunner commandLineRunner(SecMemRepository repository) {
		return args -> {
			SecMemEntity m1 = SecMemEntity.builder()
					.id("user1").password("1234").role("ROLE_USER").build();

			SecMemEntity m2 = SecMemEntity.builder()
					.id("admin1").password("1234").role("ROLE_ADMIN").build();

			repository.saveAll(List.of(m1, m2));
		};
	}
}
