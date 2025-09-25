package com.hrms.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.model.OnboardingTask;

public interface OnboardingTaskRepository extends JpaRepository<OnboardingTask, Long> {
	  List<OnboardingTask> findByEmployeeId(Long employeeId);
}
