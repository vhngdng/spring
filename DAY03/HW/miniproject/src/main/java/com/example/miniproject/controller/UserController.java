package com.example.miniproject.controller;

import com.example.miniproject.dto.CourseDetailDTO;
import com.example.miniproject.model.Course;
import com.example.miniproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/courses")  // context-path: /api/v1
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public List<Course> findAll(
            @Valid @RequestParam(value = "type", required = false) String typeValue,
            @RequestParam(value = "name", required = false) String nameValue,
            @RequestParam(value = "topic", required = false) String topicValue)
    {
        return userService.findAll(typeValue, nameValue, topicValue);
    }

    @GetMapping("/{id}")
    public CourseDetailDTO findCourseById(@PathVariable Integer id) {
        return userService.findByid(id);
    }
}
