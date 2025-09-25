package com.hrms.dto;

public class EmployeeTrainingParticipantDTO {
    private String employeeId;
    private String employeeName;
    private String completionStatus;
    private Integer score;

    public EmployeeTrainingParticipantDTO(String employeeId, String employeeName, String completionStatus, Integer score) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.completionStatus = completionStatus;
        this.score = score;
    }

    public String getEmployeeId() { return employeeId; }
    public String getEmployeeName() { return employeeName; }
    public String getCompletionStatus() { return completionStatus; }
    public Integer getScore() { return score; }
}
