package com.hostel.management.service;

import com.hostel.management.entity.Allocation;
import com.hostel.management.repository.AllocationRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AllocationService {

    private final AllocationRepository allocationRepository;

    public AllocationService(
            AllocationRepository allocationRepository) {

        this.allocationRepository = allocationRepository;
    }

    public Allocation addAllocation(
            Allocation allocation) {

        if (allocation.getAllocationDate() == null) {
            allocation.setAllocationDate(
                    LocalDate.now()
            );
        }

        if (allocation.getStatus() == null) {
            allocation.setStatus("ACTIVE");
        }

        return allocationRepository.save(allocation);
    }

    public List<Allocation> getAllAllocations() {
        return allocationRepository.findAll();
    }

    public Optional<Allocation> getAllocationById(Long id) {
        return allocationRepository.findById(id);
    }

    public Allocation updateAllocation(
            Long id,
            Allocation allocation) {

        Optional<Allocation> existing =
                allocationRepository.findById(id);

        if (existing.isEmpty()) {
            return null;
        }

        Allocation a = existing.get();

        a.setStudentId(allocation.getStudentId());
        a.setRoomId(allocation.getRoomId());
        a.setBedNumber(allocation.getBedNumber());
        a.setAllocationDate(
                allocation.getAllocationDate()
        );
        a.setStatus(allocation.getStatus());

        return allocationRepository.save(a);
    }

    public boolean deleteAllocation(Long id) {

        if (!allocationRepository.existsById(id)) {
            return false;
        }

        allocationRepository.deleteById(id);

        return true;
    }
}