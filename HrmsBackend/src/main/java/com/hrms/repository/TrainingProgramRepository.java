package com.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hrms.model.TrainingProgram;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {
    // no custom queries needed here (basic CRUD is enough)
}
