package com.hostel.management.service;

import com.hostel.management.entity.Notice;
import com.hostel.management.repository.NoticeRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public Notice addNotice(Notice notice) {

        if (notice.getCreatedDate() == null) {
            notice.setCreatedDate(LocalDate.now());
        }

        return noticeRepository.save(notice);
    }

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Optional<Notice> getNoticeById(Long id) {
        return noticeRepository.findById(id);
    }

    public Notice updateNotice(
            Long id,
            Notice notice) {

        Optional<Notice> existing =
                noticeRepository.findById(id);

        if (existing.isEmpty()) {
            return null;
        }

        Notice n = existing.get();

        n.setTitle(notice.getTitle());
        n.setDescription(notice.getDescription());
        n.setCreatedDate(notice.getCreatedDate());

        return noticeRepository.save(n);
    }

    public boolean deleteNotice(Long id) {

        if (!noticeRepository.existsById(id)) {
            return false;
        }

        noticeRepository.deleteById(id);

        return true;
    }
}