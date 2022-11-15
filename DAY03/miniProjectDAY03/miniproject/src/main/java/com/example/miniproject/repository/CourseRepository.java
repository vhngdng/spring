package com.example.miniproject.repository;

import com.example.miniproject.exception.NotFoundException;
import com.example.miniproject.model.Course;
import com.example.miniproject.model.User;
import com.example.miniproject.request.UpsertCourse;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Repository

public class CourseRepository {
    private List<Course> courses ;
    private final UserRepository userRepository;
    private final Faker faker;

    public CourseRepository(Faker faker, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.faker = faker;
        initCourses();
    }
    private void initCourses() {
        courses = new ArrayList<>();
        Random rd = new Random();
        List<String> topics = List.of("front-end", "back-end", "database", "DevOps", "basic", "AWS", "mobile");
        List<User> users = userRepository.findAll();
        for (int i = 1; i < 21; i++) {
            List<String> rdTopics = new ArrayList<>();
            for (int j = 0; j < 3; j++) {
                String rdTopic = topics.get(rd.nextInt(topics.size()));
                if (!rdTopics.contains(rdTopic)) {
                    rdTopics.add(rdTopic);
                }
            }

            User rdUser = users.get(rd.nextInt(users.size()));
            Course course = new Course(i,
                    faker.funnyName().name(),
                    faker.lorem().sentence(20),
                    rd.nextInt(2) == 1 ? "online" : "onlab",
                    rdTopics,
                    faker.avatar().image(),
                    rdUser.getId());
            courses.add(course);
        }
    }

    public List<Course> findAll() {
        return courses;
    }

    public Optional<Course> findByid(Integer id) {
        Optional<Course> course = courses.stream().filter(c -> c.getId() == id).findFirst();
        return course;
    }

    public Course save(Course course) {
        int id = courses.get(courses.size() - 1).getId() + 1;
        course.setId(id);
        courses.add(course);
        return course;
    }

    public void deleteById(Integer id) {
        Course course = findByid(id).orElseThrow(() -> new NotFoundException("Id is not existed " + id));
        courses.remove(course);
    }
}
