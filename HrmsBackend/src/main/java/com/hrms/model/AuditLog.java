package com.hrms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username; // Who performed the action
    private String action;   // Action type: ADD, UPDATE, DELETE
    private String target;   // Target entity, e.g., employee ID
    private String details;  // Additional info
    private LocalDateTime timestamp;

    public AuditLog() {}

    public AuditLog(String username, String action, String target, String details, LocalDateTime timestamp) {
        this.username = username;
        this.action = action;
        this.target = target;
        this.details = details;
        this.timestamp = timestamp;
    }

    // Getters and setters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getTarget() { return target; }
    public void setTarget(String target) { this.target = target; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
