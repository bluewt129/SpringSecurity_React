package com.brs.sun.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name="SECMEMBER")
@Entity
public class SecMemEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "smem_seq_gen")
	@SequenceGenerator(name="smem_seq_gen", sequenceName = "smem_seq", allocationSize = 1)
	@Column(name="MEMCODE")
	private Long memCode;
	
	@Column(name="ID", nullable = false, unique = true)
	private String id;
	
	@Column(name="PASSWORD", nullable = false)
	private String password;
	
	@Column(name="ROLE", nullable = false)
	private String role;
}
