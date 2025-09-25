package com.hrms.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.model.ApplicationEntity;

public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {
	List<ApplicationEntity> findByJobId(Long jobId);
	
	
}
