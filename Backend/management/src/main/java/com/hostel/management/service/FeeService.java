package com.hostel.management.service;

import com.hostel.management.entity.Fee;
import com.hostel.management.repository.FeeRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FeeService {

    private final FeeRepository feeRepository;

    public FeeService(FeeRepository feeRepository) {
        this.feeRepository = feeRepository;
    }

    public Fee addFee(Fee fee) {

        if (fee.getPaymentDate() == null) {
            fee.setPaymentDate(LocalDate.now());
        }

        if (fee.getPaymentStatus() == null) {
            fee.setPaymentStatus("PENDING");
        }

        return feeRepository.save(fee);
    }

    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }

    public List<Fee> getFeesByStudent(Long studentId) {
        return feeRepository.findByStudentId(studentId);
    }

    public Optional<Fee> getFeeById(Long id) {
        return feeRepository.findById(id);
    }

    public Fee updateFee(Long id, Fee fee) {

        Optional<Fee> existing =
                feeRepository.findById(id);

        if (existing.isEmpty()) {
            return null;
        }

        Fee f = existing.get();

        f.setStudentId(fee.getStudentId());
        f.setAmount(fee.getAmount());
        f.setPaymentDate(fee.getPaymentDate());
        f.setPaymentStatus(fee.getPaymentStatus());
        f.setPaymentMethod(fee.getPaymentMethod());

        return feeRepository.save(f);
    }

    public boolean deleteFee(Long id) {

        if (!feeRepository.existsById(id)) {
            return false;
        }

        feeRepository.deleteById(id);

        return true;
    }
}