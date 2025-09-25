package com.hrms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hrms.model.*;
import com.hrms.repository.*;

@RestController
@RequestMapping("/api/selfservice")
public class SelfServiceController {

    @Autowired private EmployeeRepository employeeRepo;
    @Autowired private AttendanceRepository attendanceRepo;
    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private PayrollRepository payrollRepo;
    @Autowired private EmployeeTrainingRepository employeeTrainingRepo;
    @Autowired private PerformanceReviewRepository reviewRepo;
    @Autowired private ApplicationRepository applicationRepo;

    // 1. Employee profile
    @GetMapping("/profile/{employeeId}")
    public ResponseEntity<Employee> getProfile(@PathVariable String employeeId) {
        Employee emp = employeeRepo.findById(employeeId).orElseThrow();
        return ResponseEntity.ok(emp);
    }

    // 2. Attendance records
    @GetMapping("/attendance/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendance(@PathVariable String employeeId) {
        List<Attendance> attendance = attendanceRepo.findByEmployee_Id(employeeId);
        return ResponseEntity.ok(attendance);
    }

    // 3. Leave requests
    @GetMapping("/leaves/{employeeId}")
    public ResponseEntity<List<LeaveRequest>> getLeaves(@PathVariable String employeeId) {
        List<LeaveRequest> leaves = leaveRepo.findByEmployeeId(employeeId);
        return ResponseEntity.ok(leaves);
    }

    // 4. Payroll records
    @GetMapping("/payroll/{employeeId}")
    public ResponseEntity<List<Payroll>> getPayroll(@PathVariable String employeeId) {
        List<Payroll> payrolls = payrollRepo.findByEmployeeId(employeeId);
        return ResponseEntity.ok(payrolls);
    }

    // 5. Trainings assigned to employee
    @GetMapping("/trainings/{employeeId}")
    public ResponseEntity<List<EmployeeTraining>> getTrainings(@PathVariable String employeeId) {
        List<EmployeeTraining> trainings = employeeTrainingRepo.findByEmployeeId(employeeId);
        return ResponseEntity.ok(trainings);
    }

    // 6. Performance reviews
    @GetMapping("/reviews/{employeeId}")
    public ResponseEntity<List<PerformanceReview>> getReviews(@PathVariable String employeeId) {
        List<PerformanceReview> reviews = reviewRepo.findByEmployeeId(employeeId);
        return ResponseEntity.ok(reviews);
    }

    // 7. Job applications
    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationEntity>> getApplications(@RequestParam(required = false) Long jobId) {
        List<ApplicationEntity> applications;
        if (jobId != null) {
            applications = applicationRepo.findByJobId(jobId);
        } else {
            applications = applicationRepo.findAll();
        }
        return ResponseEntity.ok(applications);
    }
    
    @PostMapping("/leaves")
    public ResponseEntity<LeaveRequest> createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        // Fetch the full employee entity
        String empId = leaveRequest.getEmployee().getId();
        Employee employee = employeeRepo.findById(empId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        leaveRequest.setEmployee(employee);
        leaveRequest.setStatus(LeaveStatus.PENDING); // default status
        LeaveRequest savedLeave = leaveRepo.save(leaveRequest);
        return ResponseEntity.ok(savedLeave);
    }

}
