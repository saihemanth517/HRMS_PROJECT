package com.hrms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.dto.EmployeeTrainingParticipantDTO;
import com.hrms.model.EmployeeTraining;
import com.hrms.model.TrainingProgram;
import com.hrms.repository.EmployeeTrainingRepository;
import com.hrms.repository.TrainingProgramRepository;

@RestController
@RequestMapping("/api/training")
public class TrainingController {

    @Autowired
    private TrainingProgramRepository trainingRepo;

    @Autowired
    private EmployeeTrainingRepository employeeTrainingRepo;

    // 1. Create Training Program
    @PostMapping
    public TrainingProgram createTraining(@RequestBody TrainingProgram training) {
        return trainingRepo.save(training);
    }

    // 2. Get all Training Programs
    @GetMapping
    public List<TrainingProgram> getAllTrainings() {
        return trainingRepo.findAll();
    }

    // 3. Update Training Program
    @PutMapping("/{id}")
    public ResponseEntity<TrainingProgram> updateTraining(@PathVariable Long id, @RequestBody TrainingProgram update) {
        TrainingProgram t = trainingRepo.findById(id).orElseThrow();
        if(update.getTitle() != null) t.setTitle(update.getTitle());
        if(update.getDescription() != null) t.setDescription(update.getDescription());
        if(update.getTrainerName() != null) t.setTrainerName(update.getTrainerName());
        if(update.getStartDate() != null) t.setStartDate(update.getStartDate());
        if(update.getEndDate() != null) t.setEndDate(update.getEndDate());
        if(update.getStatus() != null) t.setStatus(update.getStatus());
        return ResponseEntity.ok(trainingRepo.save(t));
    }

    // 4. Delete Training Program
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTraining(@PathVariable Long id) {
        trainingRepo.deleteById(id);
        return ResponseEntity.ok("Training deleted successfully");
    }

 // 5. Enroll Employee in Training
    @PostMapping("/enroll")
    @PreAuthorize("hasRole('HR')") // HR only can enroll employees
    public EmployeeTraining enrollEmployee(@RequestBody EmployeeTraining enrollment) {
        enrollment.setCompletionStatus("PENDING");
        // ensure employeeId is UUID (frontend should send as string)
        return employeeTrainingRepo.save(enrollment);
    }

    // 6. Update Employee Training Completion
    @PutMapping("/enroll/{id}")
    public ResponseEntity<EmployeeTraining> updateEnrollment(@PathVariable Long id, @RequestBody EmployeeTraining update) {
        EmployeeTraining et = employeeTrainingRepo.findById(id).orElseThrow();
        if(update.getCompletionStatus() != null) et.setCompletionStatus(update.getCompletionStatus());
        if(update.getScore() != null) et.setScore(update.getScore());
        return ResponseEntity.ok(employeeTrainingRepo.save(et));
    }

    // 7. Get Employee Trainings
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<EmployeeTraining>> getEmployeeTrainings(@PathVariable String employeeId) {
        List<EmployeeTraining> list = employeeTrainingRepo.findByEmployeeId(employeeId);
        return ResponseEntity.ok(list);
    }

    // 8. Get Training Participants
    @GetMapping("/training/{trainingId}/participants")
    public ResponseEntity<List<EmployeeTrainingParticipantDTO>> getTrainingParticipants(@PathVariable Long trainingId) {
        List<EmployeeTrainingParticipantDTO> participants = employeeTrainingRepo.findParticipantsWithNames(trainingId);
        return ResponseEntity.ok(participants);
    }

}
