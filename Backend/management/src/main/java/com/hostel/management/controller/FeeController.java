package com.hostel.management.controller;

import com.hostel.management.entity.Fee;
import com.hostel.management.service.FeeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "*")
public class FeeController {

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }

    @PostMapping
    public Fee addFee(@RequestBody Fee fee) {
        return feeService.addFee(fee);
    }

    @GetMapping
    public List<Fee> getAllFees() {
        return feeService.getAllFees();
    }

    @GetMapping("/student/{studentId}")
    public List<Fee> getStudentFees(
            @PathVariable Long studentId) {

        return feeService.getFeesByStudent(studentId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fee> getFee(
            @PathVariable Long id) {

        return feeService.getFeeById(id)
                .map(ResponseEntity::ok)
                .orElse(
                    ResponseEntity.notFound().build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fee> updateFee(
            @PathVariable Long id,
            @RequestBody Fee fee) {

        Fee updated =
                feeService.updateFee(id, fee);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFee(
            @PathVariable Long id) {

        if (!feeService.deleteFee(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Fee deleted successfully"
        );
    }
}