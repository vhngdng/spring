package com.example.miniproject.service;

import com.example.miniproject.exception.NotFoundException;
import com.example.miniproject.model.Course;
import com.example.miniproject.repository.CourseRepository;
import com.example.miniproject.repository.UserRepository;
import com.example.miniproject.request.UpsertCourse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public List<Course> findAllCourse() {
        return courseRepository.findAll();
    }

    public Course save(UpsertCourse upsertCourse) {
        Course newCourse = new Course(0,
                upsertCourse.getName(),
                upsertCourse.getDescription(),
                upsertCourse.getType(),
                upsertCourse.getTopics(),
                upsertCourse.getThumbnail(),
                upsertCourse.getUserId()
        );
        return courseRepository.save(newCourse);
    }

    public Course updateCourse(UpsertCourse upsertCourse, Integer id) {
        Course course = courseRepository.findByid(id).orElseThrow(() -> new NotFoundException("This id is not existed, id= " + id));
        if (upsertCourse.getName() != null ) course.setName(upsertCourse.getName());
        if(upsertCourse.getDescription() != null) course.setDescription(upsertCourse.getDescription());
        if(upsertCourse.getThumbnail() != null) course.setThumbnail(upsertCourse.getThumbnail());
        if (upsertCourse.getTopics() != null) course.setTopics(upsertCourse.getTopics());
        if (upsertCourse.getType() != null) course.setType(upsertCourse.getType());
        if (upsertCourse.getUserId() != null) course.setUserId(upsertCourse.getUserId());

        return course;
    }

    public ResponseEntity<Void> deleteCourse(Integer id) {
        courseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
