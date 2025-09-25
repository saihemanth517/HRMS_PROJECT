package com.hrms.controller;


import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hrms.model.ApplicationEntity;
import com.hrms.model.JobPosting;
import com.hrms.model.OnboardingTask;
import com.hrms.repository.ApplicationRepository;
import com.hrms.repository.JobPostingRepository;
import com.hrms.repository.OnboardingTaskRepository;
import com.hrms.service.FileStorageService;

@RestController
@RequestMapping("/api/recruitment")
public class RecruitmentController {

    @Autowired private JobPostingRepository jobPostingRepo;
    @Autowired private ApplicationRepository applicationRepo;
    @Autowired private OnboardingTaskRepository onboardingRepo;
    @Autowired private FileStorageService fileService;

    // 1. Create Job Posting
    @PostMapping("/jobs")
    public JobPosting createJob(@RequestBody JobPosting job) {
        return jobPostingRepo.save(job);
    }

    // 2. List all Job Postings
    @GetMapping("/jobs")
    public List<JobPosting> getJobs() {
        return jobPostingRepo.findAll();
    }

    // 3. Candidate applies for a job
    @PostMapping("/jobs/{jobId}/apply")
    public ResponseEntity<ApplicationEntity> applyJob(
            @PathVariable Long jobId,
            @RequestParam String candidateName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam("resume") MultipartFile resume) throws IOException {

        String path = fileService.saveFile(resume);

        ApplicationEntity app = new ApplicationEntity();
        app.setJobId(jobId);
        app.setCandidateName(candidateName);
        app.setEmail(email);
        app.setPhone(phone);
        app.setResumePath(path);

        return ResponseEntity.ok(applicationRepo.save(app));
    }

    // 4. Update application status
    @PutMapping("/applications/{id}/status")
    public ResponseEntity<ApplicationEntity> updateStatus(
            @PathVariable Long id, @RequestParam String status) {
        ApplicationEntity app = applicationRepo.findById(id).orElseThrow();
        app.setStatus(status);
        return ResponseEntity.ok(applicationRepo.save(app));
    }

    // 5. Generate onboarding tasks
    @PostMapping("/onboarding/{employeeId}")
    public List<OnboardingTask> generateTasks(@PathVariable Long employeeId) {
        List<String> tasks = Arrays.asList(
                "Submit documents",
                "Complete HR orientation",
                "Setup company email"
        );
        return onboardingRepo.saveAll(
                tasks.stream().map(t -> {
                    OnboardingTask ob = new OnboardingTask();
                    ob.setEmployeeId(employeeId);
                    ob.setTask(t);
                    return ob;
                }).toList()
        );
    }

    // 6. Mark onboarding task as DONE
    @PutMapping("/onboarding/{taskId}/complete")
    public ResponseEntity<OnboardingTask> completeTask(@PathVariable Long taskId) {
        OnboardingTask task = onboardingRepo.findById(taskId).orElseThrow();
        task.setStatus("DONE");
        return ResponseEntity.ok(onboardingRepo.save(task));
    }

    // 7. Get all applications for a specific job ✅ (missing before)
    @GetMapping("/jobs/{jobId}/applications")
    public ResponseEntity<List<ApplicationEntity>> getApplicationsByJob(@PathVariable Long jobId) {
        List<ApplicationEntity> applications = applicationRepo.findByJobId(jobId);
        return ResponseEntity.ok(applications);
    }
 // 8. Get all onboarding tasks for an employee
    @GetMapping("/onboarding/{employeeId}")
    public ResponseEntity<List<OnboardingTask>> getTasks(@PathVariable Long employeeId) {
        List<OnboardingTask> tasks = onboardingRepo.findByEmployeeId(employeeId);
        return ResponseEntity.ok(tasks);
    }
 // Update a job posting
    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<JobPosting> updateJob(
            @PathVariable Long jobId,
            @RequestBody JobPosting updatedJob) {

        JobPosting job = jobPostingRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (updatedJob.getTitle() != null) job.setTitle(updatedJob.getTitle());
        if (updatedJob.getDescription() != null) job.setDescription(updatedJob.getDescription());
        if (updatedJob.getDepartment() != null) job.setDepartment(updatedJob.getDepartment());
        if (updatedJob.getLocation() != null) job.setLocation(updatedJob.getLocation());
        if (updatedJob.getStatus() != null) job.setStatus(updatedJob.getStatus());

        return ResponseEntity.ok(jobPostingRepo.save(job));
    }
 // Delete a job posting
    @DeleteMapping("/jobs/{jobId}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long jobId) {
        JobPosting job = jobPostingRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        jobPostingRepo.delete(job);
        return ResponseEntity.noContent().build();
    }

    
}
