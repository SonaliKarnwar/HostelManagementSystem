package com.hostel.management.controller;

import com.hostel.management.entity.Visitor;
import com.hostel.management.service.VisitorService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "*")
public class VisitorController {

    private final VisitorService visitorService;

    public VisitorController(
            VisitorService visitorService) {

        this.visitorService = visitorService;
    }

    @PostMapping
    public Visitor addVisitor(
            @RequestBody Visitor visitor) {

        return visitorService.addVisitor(visitor);
    }

    @GetMapping
    public List<Visitor> getAllVisitors() {

        return visitorService.getAllVisitors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visitor> getVisitor(
            @PathVariable Long id) {

        return visitorService
                .getVisitorById(id)
                .map(ResponseEntity::ok)
                .orElse(
                    ResponseEntity.notFound().build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Visitor> updateVisitor(
            @PathVariable Long id,
            @RequestBody Visitor visitor) {

        Visitor updated =
                visitorService.updateVisitor(
                        id,
                        visitor
                );

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVisitor(
            @PathVariable Long id) {

        if (!visitorService.deleteVisitor(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Visitor deleted successfully"
        );
    }
}