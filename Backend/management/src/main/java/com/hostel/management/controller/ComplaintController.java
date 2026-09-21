package com.hostel.management.controller;

import com.hostel.management.entity.Complaint;
import com.hostel.management.service.ComplaintService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(
            ComplaintService complaintService) {

        this.complaintService = complaintService;
    }

    @PostMapping
    public Complaint addComplaint(
            @RequestBody Complaint complaint) {

        return complaintService.addComplaint(complaint);
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {

        return complaintService.getAllComplaints();
    }

    @GetMapping("/student/{studentId}")
    public List<Complaint> getStudentComplaints(
            @PathVariable Long studentId) {

        return complaintService
                .getStudentComplaints(studentId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaint(
            @PathVariable Long id) {

        return complaintService
                .getComplaintById(id)
                .map(ResponseEntity::ok)
                .orElse(
                    ResponseEntity.notFound().build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Complaint> updateComplaint(
            @PathVariable Long id,
            @RequestBody Complaint complaint) {

        Complaint updated =
                complaintService.updateComplaint(
                        id,
                        complaint
                );

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComplaint(
            @PathVariable Long id) {

        if (!complaintService.deleteComplaint(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Complaint deleted successfully"
        );
    }
}