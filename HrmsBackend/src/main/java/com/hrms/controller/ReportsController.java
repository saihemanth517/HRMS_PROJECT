package com.hrms.controller;

import com.hrms.model.Attendance;
import com.hrms.model.Payroll;
import com.hrms.model.PerformanceReview;
import com.hrms.repository.AttendanceRepository;
import com.hrms.repository.PayrollRepository;
import com.hrms.repository.PerformanceReviewRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {

    private final PayrollRepository payrollRepo;
    private final AttendanceRepository attendanceRepo;
    private final PerformanceReviewRepository performanceRepo;

    public ReportsController(PayrollRepository payrollRepo,
                             AttendanceRepository attendanceRepo,
                             PerformanceReviewRepository performanceRepo) {
        this.payrollRepo = payrollRepo;
        this.attendanceRepo = attendanceRepo;
        this.performanceRepo = performanceRepo;
    }

    @GetMapping("/summary")
    public Map<String, Object> getReportsSummary() {

        // 1️⃣ Total Payroll (sum of netSalary)
        List<Payroll> payrolls = payrollRepo.findAll();
        double totalSalary = payrolls.stream()
                .filter(p -> p.getNetSalary() != null)
                .mapToDouble(Payroll::getNetSalary)
                .sum();

        // 2️⃣ Attendance Summary
        List<Attendance> attendanceRecords = attendanceRepo.findAll();
        Map<String, Long> attendanceSummary = attendanceRecords.stream()
                .filter(r -> r.getStatus() != null)
                .collect(Collectors.groupingBy(
                        r -> r.getStatus().name(), // Assuming AttendanceStatus enum
                        Collectors.counting()
                ));

        // 3️⃣ Performance Review Summary (average score per status)
        List<PerformanceReview> reviews = performanceRepo.findAll();
        Map<String, Double> performanceSummary = reviews.stream()
                .collect(Collectors.groupingBy(
                        PerformanceReview::getStatus,
                        Collectors.averagingDouble(PerformanceReview::getScore)
                ));

        // Combine all summaries
        return Map.of(
                "totalSalary", totalSalary,
                "attendanceSummary", attendanceSummary,
                "performanceSummary", performanceSummary
        );
    }
}
