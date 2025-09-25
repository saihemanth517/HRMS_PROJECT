package com.hrms.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.model.Attendance;
import com.hrms.model.AttendanceStatus;
import com.hrms.service.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    public ResponseEntity<Attendance> markAttendance(
            @RequestParam String employeeId,
            @RequestParam AttendanceStatus status,
            @RequestParam String date) {
        
        Attendance attendance = attendanceService.markAttendance(employeeId, status, LocalDate.parse(date));
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendance(@PathVariable String employeeId) {
        List<Attendance> records = attendanceService.getAttendanceByEmployee(employeeId);
        if (records == null) records = new ArrayList<>(); // ensure not null
        return ResponseEntity.ok(records);
    }


    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }

    @PutMapping("/{attendanceId}")
    public ResponseEntity<Attendance> updateAttendance(
            @PathVariable String attendanceId,
            @RequestParam String status) {

        AttendanceStatus attendanceStatus;
        try {
            attendanceStatus = AttendanceStatus.from(status);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        Attendance updated = attendanceService.updateAttendance(attendanceId, attendanceStatus);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{attendanceId}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable String attendanceId) {
        attendanceService.deleteAttendance(attendanceId); // ✅ service handles repository
        return ResponseEntity.noContent().build();
    }


}
