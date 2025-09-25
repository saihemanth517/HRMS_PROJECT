package com.hrms.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.model.JobPosting;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
}

