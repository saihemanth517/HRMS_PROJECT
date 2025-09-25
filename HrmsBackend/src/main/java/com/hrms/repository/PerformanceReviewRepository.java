package com.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hrms.model.PerformanceReview;
import java.util.List;

public interface PerformanceReviewRepository extends JpaRepository<PerformanceReview, Long> {

    // Fetch all reviews for an employee
    List<PerformanceReview> findByEmployeeId(String employeeId);
    
    // Optional: filter by reviewer
    List<PerformanceReview> findByReviewerId(String reviewerId);
}
