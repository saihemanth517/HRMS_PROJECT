package com.hrms.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String department;
    private String location;
    private String status; // OPEN / CLOSED
    private LocalDate createdDate;

    @PrePersist
    public void onCreate() {
        createdDate = LocalDate.now();
        status = "OPEN";
    }

    // Getters & Setters
    // ...
}
