package com.hrms.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.model.Employee;
import com.hrms.model.Payroll;
import com.hrms.repository.PayrollRepository;

@Service
@Transactional
public class PayrollService {

    private final PayrollRepository payrollRepository;

    public PayrollService(PayrollRepository payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    public Payroll generatePayroll(Employee employee, String month, Double bonus, Double deductions) {
        Double basicSalary = employee.getSalary();
        Double netSalary = basicSalary + (bonus != null ? bonus : 0) - (deductions != null ? deductions : 0);
        Payroll payroll = new Payroll(employee, month, basicSalary, bonus, deductions, netSalary, "UNPAID");
        return payrollRepository.save(payroll);
    }

    public List<Payroll> getPayrollByEmployee(String employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }

    public List<Payroll> getPayrollByMonth(String month) {
        return payrollRepository.findByMonth(month);
    }

    public Payroll markAsPaid(String payrollId) {
        Payroll payroll = payrollRepository.findById(payrollId).orElseThrow(() -> new RuntimeException("Payroll not found"));
        payroll.setStatus("PAID");
        payroll.setUpdatedAt(java.time.LocalDateTime.now());
        return payrollRepository.save(payroll);
    }
    
    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

}
