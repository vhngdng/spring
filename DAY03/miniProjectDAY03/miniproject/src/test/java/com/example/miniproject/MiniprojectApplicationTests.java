package com.example.miniproject;

import com.example.miniproject.controller.UserController;
import com.example.miniproject.dto.CourseDetailDTO;
import com.example.miniproject.model.Course;
import com.example.miniproject.model.User;
import com.example.miniproject.repository.CourseRepository;
import com.example.miniproject.repository.UserRepository;
import com.example.miniproject.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.awt.desktop.SystemSleepEvent;
import java.util.List;

@SpringBootTest
class MiniprojectApplicationTests {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserController userController;

    @Test
    void contextLoads() {
    }

    @Test
    void showUser() {
        List<User> users = userRepository.findAll();
        users.forEach(System.out::println);
    }

    @Test
    void showCourse() {
        List<Course> courses = courseRepository.findAll();
        courses.forEach(System.out::println);
    }

    @Test
    void showDetailledCourse() {
        CourseDetailDTO courseDetailDTO = userController.findCourseById(3);
        System.out.println(courseDetailDTO.toString());
    }


}
