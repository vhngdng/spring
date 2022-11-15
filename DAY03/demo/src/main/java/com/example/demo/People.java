package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Random;
@RequiredArgsConstructor
@Component
public class People {
    private final Student student;
    private final Random random;

//    public People(Student student, Random random) {
//        this.student = student;
//        this.random = random;
//    }
}
