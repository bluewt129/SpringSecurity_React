package com.brs.sun.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SecMemRepository extends JpaRepository<SecMemEntity, Long> {

	@Query("SELECT s FROM SecMemEntity s WHERE s.id = :id")
	public Optional<SecMemEntity> findUserById(@Param("id") String id);

}
