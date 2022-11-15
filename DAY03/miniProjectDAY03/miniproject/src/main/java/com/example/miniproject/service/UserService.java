package com.example.miniproject.service;

import com.example.miniproject.dto.CourseDetailDTO;
import com.example.miniproject.exception.NotFoundException;
import com.example.miniproject.model.Course;
import com.example.miniproject.model.User;
import com.example.miniproject.repository.CourseRepository;
import com.example.miniproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public List<Course> findAll(String typeValue, String nameValue,String topicValue) {
        List<Course> courses = courseRepository.findAll();
        List<Course> result = List.copyOf(courses);

        if (typeValue == null && nameValue == null && topicValue == null) {
            return courses;
        } else {
            if (typeValue != null) {
                result = result.stream().filter(n -> n.getType().contains(typeValue)).toList();
            }

            if (nameValue != null) {
                result = result.stream().filter(course ->
                        course.getName().contains(nameValue)).toList();
            }
            if (topicValue != null) {
                result = result.stream().filter(course ->
                        course.getTopics().contains(topicValue)).toList();
            }
        }


        return result;
    }

    public CourseDetailDTO findByid(Integer id) {
        Course course = courseRepository.findByid(id)
                .orElseThrow(() -> new NotFoundException("This id is not existed, id= " + id));
        User user = userRepository.findByid(course.getUserId())
                .orElseThrow(() -> new NotFoundException("This id is not existed, id= " + id));
        return new CourseDetailDTO(
                course.getId(),
                course.getName(),
                course.getDescription(),
                course.getType(),
                course.getTopics(),
                course.getThumbnail(),
                user);

    }
}
