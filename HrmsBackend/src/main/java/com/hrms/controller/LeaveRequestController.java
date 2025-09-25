package com.hrms.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hrms.model.LeaveRequest;
import com.hrms.model.Employee;
import com.hrms.model.LeaveStatus;
import com.hrms.service.LeaveRequestService;
import com.hrms.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;
    private final EmployeeRepository employeeRepository;

    public LeaveRequestController(LeaveRequestService leaveRequestService,
                                  EmployeeRepository employeeRepository) {
        this.leaveRequestService = leaveRequestService;
        this.employeeRepository = employeeRepository;
    }

    // Employee requests leave (authenticated via JWT)
    @PostMapping
    public ResponseEntity<LeaveRequest> requestLeave(@RequestBody LeaveRequest leaveRequest,
                                                     Principal principal) {
        Employee employee = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        leaveRequest.setEmployee(employee);
        leaveRequest.setStatus(LeaveStatus.PENDING);

        LeaveRequest savedLeave = leaveRequestService.save(leaveRequest);
        return ResponseEntity.ok(savedLeave);
    }

    // Get leaves for logged-in employee
    @GetMapping("/my")
    public ResponseEntity<List<LeaveRequest>> getMyLeaves(Principal principal) {
        Employee employee = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        List<LeaveRequest> leaves = leaveRequestService.getLeavesByEmployee(employee.getId());
        return ResponseEntity.ok(leaves);
    }

    // Admin endpoints remain same
    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {
        return ResponseEntity.ok(leaveRequestService.getAllLeaves());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveRequest> approveLeave(@PathVariable String id) {
        return ResponseEntity.ok(leaveRequestService.approveLeave(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveRequest> rejectLeave(@PathVariable String id) {
        return ResponseEntity.ok(leaveRequestService.rejectLeave(id));
    }
}
