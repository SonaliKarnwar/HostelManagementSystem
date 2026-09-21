package com.hostel.management.service;

import com.hostel.management.entity.Visitor;
import com.hostel.management.repository.VisitorRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;

    public VisitorService(
            VisitorRepository visitorRepository) {

        this.visitorRepository = visitorRepository;
    }

    public Visitor addVisitor(Visitor visitor) {

        if (visitor.getVisitDate() == null) {
            visitor.setVisitDate(LocalDate.now());
        }

        return visitorRepository.save(visitor);
    }

    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    public Optional<Visitor> getVisitorById(Long id) {
        return visitorRepository.findById(id);
    }

    public Visitor updateVisitor(
            Long id,
            Visitor visitor) {

        Optional<Visitor> existing =
                visitorRepository.findById(id);

        if (existing.isEmpty()) {
            return null;
        }

        Visitor v = existing.get();

        v.setStudentId(visitor.getStudentId());
        v.setVisitorName(visitor.getVisitorName());
        v.setPhone(visitor.getPhone());
        v.setVisitDate(visitor.getVisitDate());
        v.setInTime(visitor.getInTime());
        v.setOutTime(visitor.getOutTime());
        v.setPurpose(visitor.getPurpose());

        return visitorRepository.save(v);
    }

    public boolean deleteVisitor(Long id) {

        if (!visitorRepository.existsById(id)) {
            return false;
        }

        visitorRepository.deleteById(id);

        return true;
    }
}