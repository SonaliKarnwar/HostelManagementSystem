package com.hostel.management.service;

import com.hostel.management.entity.Student;
import com.hostel.management.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student updateStudent(
            Long id,
            Student student) {

        Optional<Student> existing =
                studentRepository.findById(id);

        if (existing.isEmpty()) {
            return null;
        }

        Student s = existing.get();

        s.setName(student.getName());
        s.setEmail(student.getEmail());
        s.setPhone(student.getPhone());
        s.setCourse(student.getCourse());
        s.setDepartment(student.getDepartment());
        s.setRoomNumber(student.getRoomNumber());

        return studentRepository.save(s);
    }

    public boolean deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {
            return false;
        }

        studentRepository.deleteById(id);
        return true;
    }
}