package com.example.test.Mapper;

import com.example.test.dto.UserDTO;
import com.example.test.entity.User;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Mapper {

    public UserDTO toDTO(User user) {
        UserDTO userDTO = new UserDTO();
        if(user.getAddress() != null) userDTO.setAddress(user.getAddress());
        if(user.getName() != null) userDTO.setName(user.getName());
        if(user.getId() != 0) userDTO.setId(user.getId());
        if(user.getAvatar() != null) userDTO.setAvatar(user.getAvatar());
        if(user.getEmail() != null) userDTO.setEmail(user.getEmail());
        if(user.getPhone() != null) userDTO.setPhone(user.getPhone());
        return userDTO;
    }
}
