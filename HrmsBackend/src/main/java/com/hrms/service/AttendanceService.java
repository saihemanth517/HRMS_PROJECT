package com.hrms.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hrms.model.Attendance;
import com.hrms.model.Employee;
import com.hrms.model.AttendanceStatus;
import com.hrms.repository.AttendanceRepository;
import com.hrms.repository.EmployeeRepository;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    public Attendance markAttendance(String employeeId, AttendanceStatus status, LocalDate date) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setStatus(status);
        attendance.setDate(date);

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByEmployee(String employeeId) {
        return attendanceRepository.findByEmployee_Id(employeeId);
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Attendance updateAttendance(String attendanceId, AttendanceStatus status) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        attendance.setStatus(status);
        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(String attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));
        attendanceRepository.delete(attendance);
    }
}
