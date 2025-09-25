package com.hrms.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.model.Employee;
import com.hrms.model.Payroll;
import com.hrms.service.EmployeeService;
import com.hrms.service.PayrollService;

@RestController
@RequestMapping("/api/payrolls")
public class PayrollController {

    private final PayrollService payrollService;
    private final EmployeeService employeeService;

    public PayrollController(PayrollService payrollService, EmployeeService employeeService) {
        this.payrollService = payrollService;
        this.employeeService = employeeService;
    }

    @PostMapping("/generate/{employeeId}")
    public ResponseEntity<Payroll> generatePayroll(@PathVariable String employeeId,
                                                   @RequestParam String month,
                                                   @RequestParam(required = false) Double bonus,
                                                   @RequestParam(required = false) Double deductions) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        Payroll payroll = payrollService.generatePayroll(employee, month, bonus, deductions);
        return ResponseEntity.ok(payroll);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Payroll>> getPayrollByEmployee(@PathVariable String employeeId) {
        List<Payroll> payrolls = payrollService.getPayrollByEmployee(employeeId);
        if (payrolls == null) payrolls = new ArrayList<>();
        return ResponseEntity.ok(payrolls);
    }


    @GetMapping("/month/{month}")
    public ResponseEntity<List<Payroll>> getPayrollByMonth(@PathVariable String month) {
        return ResponseEntity.ok(payrollService.getPayrollByMonth(month));
    }

    @PutMapping("/pay/{payrollId}")
    public ResponseEntity<Payroll> markPayrollAsPaid(@PathVariable String payrollId) {
        return ResponseEntity.ok(payrollService.markAsPaid(payrollId));
    }
    
    @GetMapping
    public ResponseEntity<List<Payroll>> getAllPayrolls() {
        List<Payroll> payrolls = payrollService.getAllPayrolls();
        return ResponseEntity.ok(payrolls);
    }
    
    

}
