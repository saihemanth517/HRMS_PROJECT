package com.hrms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "performance_reviews")
public class PerformanceReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeId;       // Employee being reviewed (UUID)
    private String reviewerId;       // HR or manager giving review (UUID)
    private int score;               // Performance score (e.g., 1-5)
    private String comments;         // Review comments
    private LocalDate reviewDate;    // Date of review

    // Optional: status field like PENDING/COMPLETED
    private String status = "COMPLETED";

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public String getReviewerId() { return reviewerId; }
    public void setReviewerId(String reviewerId) { this.reviewerId = reviewerId; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public LocalDate getReviewDate() { return reviewDate; }
    public void setReviewDate(LocalDate reviewDate) { this.reviewDate = reviewDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
