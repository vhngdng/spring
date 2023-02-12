package com.example.jpabasic.repository;

import com.example.jpabasic.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}