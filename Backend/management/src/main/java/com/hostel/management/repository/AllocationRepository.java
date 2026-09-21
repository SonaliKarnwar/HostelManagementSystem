package com.hostel.management.repository;

import com.hostel.management.entity.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllocationRepository
        extends JpaRepository<Allocation, Long> {

}