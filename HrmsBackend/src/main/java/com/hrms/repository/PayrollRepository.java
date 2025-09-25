package com.hrms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.model.Payroll;

public interface PayrollRepository extends JpaRepository<Payroll, String> {
    List<Payroll> findByEmployeeId(String employeeId);
    List<Payroll> findByMonth(String month);
}
