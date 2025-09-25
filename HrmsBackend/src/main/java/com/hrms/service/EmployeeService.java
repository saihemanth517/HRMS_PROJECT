package com.hrms.service;

import com.hrms.model.Employee;
import com.hrms.model.AuditLog;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.AuditLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AuditLogRepository auditLogRepository;
    private final HttpServletRequest request; // To get logged-in user

    public EmployeeService(EmployeeRepository employeeRepository,
                           AuditLogRepository auditLogRepository,
                           HttpServletRequest request) {
        this.employeeRepository = employeeRepository;
        this.auditLogRepository = auditLogRepository;
        this.request = request;
    }

    private String getCurrentUsername() {
        return request.getUserPrincipal() != null ? request.getUserPrincipal().getName() : "SYSTEM";
    }

    // Add new employee
    public Employee addEmployee(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        Employee saved = employeeRepository.save(employee);

        auditLogRepository.save(new AuditLog(
            getCurrentUsername(),
            "ADD_EMPLOYEE",
            saved.getId(),
            "Added employee: " + saved.getName(),
            LocalDateTime.now()
        ));

        return saved;
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Employee getEmployeeById(String id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isEmpty()) {
            throw new RuntimeException("Employee not found");
        }
        return employee.get();
    }

    // Update employee
    public Employee updateEmployee(String id, Employee updatedEmployee) {
        Employee employee = getEmployeeById(id);
        employee.setName(updatedEmployee.getName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setRole(updatedEmployee.getRole());
        employee.setDepartment(updatedEmployee.getDepartment());
        employee.setPosition(updatedEmployee.getPosition());
        employee.setSalary(updatedEmployee.getSalary());
        employee.setDateOfJoining(updatedEmployee.getDateOfJoining());
        employee.setStatus(updatedEmployee.getStatus());
        Employee updated = employeeRepository.save(employee);

        auditLogRepository.save(new AuditLog(
            getCurrentUsername(),
            "UPDATE_EMPLOYEE",
            updated.getId(),
            "Updated employee: " + updated.getName(),
            LocalDateTime.now()
        ));

        return updated;
    }

    // Delete employee
    public void deleteEmployee(String id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);

        auditLogRepository.save(new AuditLog(
            getCurrentUsername(),
            "DELETE_EMPLOYEE",
            employee.getId(),
            "Deleted employee: " + employee.getName(),
            LocalDateTime.now()
        ));
    }

    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public void changePassword(String id, String newPassword) {
        Employee employee = getEmployeeById(id);
        if (newPassword == null || newPassword.isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }
        employee.setPassword(newPassword);
        employeeRepository.save(employee);

        auditLogRepository.save(new AuditLog(
            getCurrentUsername(),
            "CHANGE_PASSWORD",
            employee.getId(),
            "Changed password for employee: " + employee.getName(),
            LocalDateTime.now()
        ));
    }
}
