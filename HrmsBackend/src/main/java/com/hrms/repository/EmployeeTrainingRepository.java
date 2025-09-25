package com.hrms.repository;

import com.hrms.dto.EmployeeTrainingParticipantDTO;
import com.hrms.model.EmployeeTraining;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeTrainingRepository extends JpaRepository<EmployeeTraining, Long> {

    @Query("SELECT new com.hrms.dto.EmployeeTrainingParticipantDTO(e.id, e.name, et.completionStatus, et.score) " +
           "FROM EmployeeTraining et JOIN et.employee e " +
           "WHERE et.trainingId = :trainingId")
    List<EmployeeTrainingParticipantDTO> findParticipantsWithNames(@Param("trainingId") Long trainingId);

	List<EmployeeTraining> findByEmployeeId(String employeeId);
}
