package com.example.miniproject.controller;

import com.example.miniproject.entity.User;
import com.example.miniproject.entity.UserDTO;
import com.example.miniproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

        @GetMapping("/login")
    public UserDTO login(@RequestParam("username") String username,
                         @RequestParam("password") String password) {
       return userService.findUser(username, password);
    }
}
