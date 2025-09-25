package com.hrms.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hrms.model.PerformanceReview;
import com.hrms.repository.PerformanceReviewRepository;

@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    @Autowired
    private PerformanceReviewRepository performanceRepo;

    // 1. Add Performance Review
    @PostMapping
    public PerformanceReview addReview(@RequestBody PerformanceReview review) {
        review.setReviewDate(LocalDate.now()); // set today's date
        review.setStatus("COMPLETED");
        return performanceRepo.save(review);
    }

    // 2. Update Performance Review
    @PutMapping("/{id}")
    public ResponseEntity<PerformanceReview> updateReview(@PathVariable Long id, @RequestBody PerformanceReview updatedReview) {
        PerformanceReview review = performanceRepo.findById(id).orElseThrow();
        review.setScore(updatedReview.getScore());
        review.setComments(updatedReview.getComments());
        review.setStatus(updatedReview.getStatus());
        return ResponseEntity.ok(performanceRepo.save(review));
    }

    // 3. Get all reviews for an employee
    @GetMapping("/employee/{employeeId}")
    public List<PerformanceReview> getReviewsByEmployee(@PathVariable String employeeId) {
        return performanceRepo.findByEmployeeId(employeeId);
    }

    // 4. Get all reviews
    @GetMapping
    public List<PerformanceReview> getAllReviews() {
        return performanceRepo.findAll();
    }
    
    // 5. Delete a performance review
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        PerformanceReview review = performanceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id " + id));
        performanceRepo.delete(review);
        return ResponseEntity.noContent().build();
    }
}
