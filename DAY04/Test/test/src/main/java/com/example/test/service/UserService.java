package com.example.test.service;


import com.example.test.Mapper.Mapper;
import com.example.test.PasswordChange.PasswordModel;
import com.example.test.controller.Avatar;
import com.example.test.controller.outer.Data;
import com.example.test.dto.UserDTO;
import com.example.test.dto.UserSignUp;
import com.example.test.exception.NotFoundException;
import com.example.test.model.User;
import com.example.test.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Mapper mapper;
//    public UserDTO findAll(int id) {
//        User user = userRepository.findAll();
//    }

    public UserDTO findById(int id) {
        User user = userRepository.findUserById(id).orElseThrow(() -> new NotFoundException("User not found"));
//        UserDTO userDTO = new UserDTO();
        return mapper.toDTO(user);
//            userDTO.setAddress(user.getAddress());
//            userDTO.setName(user.getName());
//            userDTO.setId(user.getId());
//            userDTO.setAvatar(user.getAvatar());
//            userDTO.setEmail(user.getEmail());
//            userDTO.setPhone(user.getPhone());
//        return userDTO;
    }

    public UserDTO findByName(String name) {
        User user = userRepository.findByName(name).orElseThrow(() -> new NotFoundException("User khong ton tai"));
        UserDTO userDTO = new UserDTO();
        if (user.getAddress() != null) userDTO.setAddress(user.getAddress());
        if (user.getName() != null) userDTO.setName(user.getName());
        if (user.getId() != 0) userDTO.setId(user.getId());
        if (user.getAvatar() != null) userDTO.setAvatar(user.getAvatar());
        if (user.getEmail() != null) userDTO.setEmail(user.getEmail());
        if (user.getPhone() != null) userDTO.setPhone(user.getPhone());
        return userDTO;
    }

    public Data findUserPaging(int page, int limit) {
        List<User> users = userRepository.findAll();
        int count = users.size();
        int totalPage = (int) Math.ceil(count / limit);
        int offSet = page * limit - limit;
        List<UserDTO> userList = new ArrayList<>();
        for (int i = 0; i < limit; i++) {
            userList.add(mapper.toDTO(users.get(i + offSet)));
        }
        return new Data(userList, page, limit, totalPage);

    }

    public UserDTO createUser(UserSignUp userSignUp) {
        int index = userRepository.count();
        User user = new User(0, userSignUp.getName(), userSignUp.getEmail(), userSignUp.getPhone(), userSignUp.getAddress(), null, userSignUp.getPassword());
        return mapper.toDTO(userRepository.save(user));
    }


    public void deleteUser(int id) {
        User user = userRepository.findUserById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
        userRepository.delete(user);

    }

    public UserDTO updateUser(UserDTO userDTO, int id) {
        User user = userRepository.findUserById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
        if (userDTO.getAddress() != null) user.setAddress(userDTO.getAddress());
        if (userDTO.getName() != null) user.setName(userDTO.getName());
        if (userDTO.getAvatar() != null) user.setAvatar(userDTO.getAvatar());
        if (userDTO.getEmail() != null) user.setEmail(userDTO.getEmail());
        if (userDTO.getPhone() != null) user.setPhone(userDTO.getPhone());
        return mapper.toDTO(user);
//        return mapper.toDTO(userRepository.findUserById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id)));
    }


    public void changeAvatar(Avatar avatar, int id) {
        User user = userRepository.findUserById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
        user.setAvatar(avatar.getAvatar());
    }


    public void changePassword(PasswordModel passwordModel, int id) {
        User user = userRepository.findUserById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
        if (!user.getPassword().equals(passwordModel.getOldPassword())) {
            throw new NotFoundException("PassWord khong chinh xac " + passwordModel.getOldPassword());
        }
        if (passwordModel.getNewPassword().equals(passwordModel.getOldPassword())) {
            throw new NotFoundException("PassWord moi va cu bi trung");
        } else {
            user.setPassword(passwordModel.getNewPassword());
        }
    }


    public String forgotPassword(int id) {
        return userRepository.findUserById(id)
                .orElseThrow(() -> new NotFoundException("Khong ton tai id " + id))
                .getPassword();
    }
}