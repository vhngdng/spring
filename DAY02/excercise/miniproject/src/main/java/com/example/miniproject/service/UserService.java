package com.example.miniproject.service;

import com.example.miniproject.entity.User;
import com.example.miniproject.entity.UserDTO;
import com.example.miniproject.exception.BadRequestException;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static User user = new User(1, "admin", "admin@gmail.com", "admin", "avatar");


    public UserDTO findUser(String username, String password) {
        if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
            return new UserDTO(user.getUsername(), user.getEmail(), user.getAvatar());
        }else {
            throw new BadRequestException("username hoặc password chưa chính xác");
        }
    }
}
