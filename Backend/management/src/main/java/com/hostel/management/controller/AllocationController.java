package com.hostel.management.controller;

import com.hostel.management.entity.Allocation;
import com.hostel.management.service.AllocationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allocations")
@CrossOrigin(origins = "*")
public class AllocationController {

    private final AllocationService allocationService;

    public AllocationController(
            AllocationService allocationService) {

        this.allocationService = allocationService;
    }

    @PostMapping
    public Allocation addAllocation(
            @RequestBody Allocation allocation) {

        return allocationService.addAllocation(allocation);
    }

    @GetMapping
    public List<Allocation> getAllAllocations() {

        return allocationService.getAllAllocations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Allocation> getAllocation(
            @PathVariable Long id) {

        return allocationService
                .getAllocationById(id)
                .map(ResponseEntity::ok)
                .orElse(
                    ResponseEntity.notFound().build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Allocation> updateAllocation(
            @PathVariable Long id,
            @RequestBody Allocation allocation) {

        Allocation updated =
                allocationService.updateAllocation(
                        id,
                        allocation
                );

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAllocation(
            @PathVariable Long id) {

        if (!allocationService.deleteAllocation(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Allocation deleted successfully"
        );
    }
}