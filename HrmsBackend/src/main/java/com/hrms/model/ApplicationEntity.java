package com.hrms.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class ApplicationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long jobId;
    private String candidateName;
    private String email;
    private String phone;
    private String resumePath; // saved file path
    private String status; // APPLIED / SHORTLISTED / REJECTED / HIRED

    @PrePersist
    public void onCreate() {
        status = "APPLIED";
    }

    // Getters & Setters
    // ...
}

