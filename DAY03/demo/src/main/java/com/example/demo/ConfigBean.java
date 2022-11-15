package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigBean {
    @Bean("student3")
    public Student createStudent1() {
        return new Student("Ngo Thi C", "c@gmail.com");
    }
}
