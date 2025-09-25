package com.hrms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.model.Employee;
import com.hrms.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    // Add employee (HR/Admin only)
    @PreAuthorize("hasRole('HR') or hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeService.addEmployee(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    // Get all employees (HR/Admin only)
    @PreAuthorize("hasRole('HR') or hasRole('ADMIN') or hasRole('FINANCE')")
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }


    // Get single employee by ID (HR/Admin/Finance/Employee)
    @PreAuthorize("hasAnyRole('HR','ADMIN','EMPLOYEE','FINANCE')")
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    // Update employee (HR/Admin only)
    @PreAuthorize("hasRole('HR') or hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String id, @RequestBody Employee employee) {
        Employee updated = employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok(updated);
    }

    // Delete employee (HR/Admin only)
    @PreAuthorize("hasRole('HR') or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    // ✅ Employee Profile - logged-in employee only
    @PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/me")
    public ResponseEntity<Employee> getMyProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // email from JWT principal
        Employee employee = employeeService.getEmployeeByEmail(email);
        return ResponseEntity.ok(employee);
    }
    
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable String id, @RequestBody Map<String,String> body) {
        employeeService.changePassword(id, body.get("newPassword"));
        return ResponseEntity.ok("Password updated successfully");
    }  
    
    
     @PreAuthorize("hasRole('EMPLOYEE')")
    @PutMapping("/me")
    public ResponseEntity<Employee> updateMyProfile(@RequestBody Employee updatedEmployee) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Employee existing = employeeService.getEmployeeByEmail(email);

        existing.setName(updatedEmployee.getName());
        existing.setDepartment(updatedEmployee.getDepartment());
        existing.setPosition(updatedEmployee.getPosition());
        existing.setSalary(updatedEmployee.getSalary());
        existing.setDateOfJoining(updatedEmployee.getDateOfJoining());
        existing.setStatus(updatedEmployee.getStatus());

        // ✅ Allow role editing but restrict elevation
        String newRole = updatedEmployee.getRole();
        if (newRole != null && (newRole.equals("EMPLOYEE") || newRole.equals("FINANCE") || newRole.equals("HR"))) {
            existing.setRole(newRole);
        }

        Employee saved = employeeService.updateEmployee(existing.getId(), existing);
        return ResponseEntity.ok(saved);
    }

}
