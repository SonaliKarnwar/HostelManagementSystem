package com.hostel.management.service;

import com.hostel.management.entity.Complaint;
import com.hostel.management.repository.ComplaintRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    public ComplaintService(
            ComplaintRepository complaintRepository) {

        this.complaintRepository = complaintRepository;
    }

    public Complaint addComplaint(
            Complaint complaint) {

        if (complaint.getDate() == null) {
            complaint.setDate(LocalDate.now());
        }

        if (complaint.getStatus() == null) {
            complaint.setStatus("PENDING");
        }

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public List<Complaint> getStudentComplaints(
            Long studentId) {

        return complaintRepository
                .findByStudentId(studentId);
    }

    public Optional<Complaint> getComplaintById(
            Long id) {

        return complaintRepository.findById(id);
    }

    public Complaint updateComplaint(
            Long id,
            Complaint complaint) {

        Optional<Complaint> existing =
                complaintRepository.findById(id);

        if (existing.isEmpty()) {
            return null;
        }

        Complaint c = existing.get();

        c.setStudentId(complaint.getStudentId());
        c.setTitle(complaint.getTitle());
        c.setDescription(complaint.getDescription());
        c.setDate(complaint.getDate());
        c.setStatus(complaint.getStatus());

        return complaintRepository.save(c);
    }

    public boolean deleteComplaint(Long id) {

        if (!complaintRepository.existsById(id)) {
            return false;
        }

        complaintRepository.deleteById(id);

        return true;
    }
}