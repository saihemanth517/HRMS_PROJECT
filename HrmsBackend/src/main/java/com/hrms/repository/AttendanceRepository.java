package com.hrms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hrms.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, String> {
	List<Attendance> findByEmployee_Id(String employeeId);
    
}
