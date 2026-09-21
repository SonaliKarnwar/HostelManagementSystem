package com.hostel.management.controller;

import com.hostel.management.entity.Notice;
import com.hostel.management.service.NoticeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "*")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @PostMapping
    public Notice addNotice(
            @RequestBody Notice notice) {

        return noticeService.addNotice(notice);
    }

    @GetMapping
    public List<Notice> getAllNotices() {

        return noticeService.getAllNotices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNotice(
            @PathVariable Long id) {

        return noticeService
                .getNoticeById(id)
                .map(ResponseEntity::ok)
                .orElse(
                    ResponseEntity.notFound().build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notice> updateNotice(
            @PathVariable Long id,
            @RequestBody Notice notice) {

        Notice updated =
                noticeService.updateNotice(
                        id,
                        notice
                );

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotice(
            @PathVariable Long id) {

        if (!noticeService.deleteNotice(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Notice deleted successfully"
        );
    }
}