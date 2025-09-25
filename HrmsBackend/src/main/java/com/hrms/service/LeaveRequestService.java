package com.hrms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hrms.model.LeaveRequest;
import com.hrms.repository.LeaveRequestRepository;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    public LeaveRequest save(LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getLeavesByEmployee(String employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestRepository.findAll();
    }

    public LeaveRequest approveLeave(String id) {
        LeaveRequest leave = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        leave.setStatus(com.hrms.model.LeaveStatus.APPROVED);
        return leaveRequestRepository.save(leave);
    }

    public LeaveRequest rejectLeave(String id) {
        LeaveRequest leave = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        leave.setStatus(com.hrms.model.LeaveStatus.REJECTED);
        return leaveRequestRepository.save(leave);
    }
}
