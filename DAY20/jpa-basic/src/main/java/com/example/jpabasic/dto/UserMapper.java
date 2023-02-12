package com.example.jpabasic.dto;

import com.example.jpabasic.entity.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

public class UserMapper {

  public static UserDTO toUserDTO(User user) {
    return new UserDTO(user.getId(), user.getName(), user.getEmail());
  }
}
