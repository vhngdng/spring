package com.example.test.service;


import com.example.test.Mapper.Mapper;
import com.example.test.PasswordChange.PasswordModel;
import com.example.test.controller.outer.Avatar;
import com.example.test.controller.outer.Data;
import com.example.test.dto.UserDTO;
import com.example.test.request.UserSignUp;
import com.example.test.exception.NotFoundException;
import com.example.test.entity.User;
import com.example.test.repository.UserRepository;
import com.example.test.request.UpdateAvatarRequest;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final FileService fileService;
  private final Mapper mapper;

  private final EmailService mailService;

  private final Faker faker;

  public List<UserDTO> findAllUser() {
    return userRepository.findAll().stream().map(mapper::toDTO).toList();

  }

  public UserDTO findById(int id) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    return mapper.toDTO(user);
  }

  public List<UserDTO> findByName(String name) {
    List<User> user = userRepository.findByName(name);
    if (user.isEmpty()) throw new NotFoundException("User khong ton tai");
    return user.stream().map(mapper::toDTO).toList();
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
    int index = (int)userRepository.count();
    User user = new User(0, userSignUp.getName(), userSignUp.getEmail(), userSignUp.getPhone(), userSignUp.getAddress().toString(), null, userSignUp.getPassword());
    return mapper.toDTO(userRepository.save(user));
  }


  public void deleteUser(int id) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
    userRepository.delete(user);

  }

  public UserDTO updateUser(UserDTO userDTO, int id) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
    if (userDTO.getAddress() != null) user.setAddress(userDTO.getAddress());
    if (userDTO.getName() != null) user.setName(userDTO.getName());
    if (userDTO.getAvatar() != null) user.setAvatar(userDTO.getAvatar());
    if (userDTO.getEmail() != null) user.setEmail(userDTO.getEmail());
    if (userDTO.getPhone() != null) user.setPhone(userDTO.getPhone());
    System.out.println(user.getAddress().toString());
    return mapper.toDTO(user);
  }


  public void changeAvatar(Avatar avatar, int id) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
    user.setAvatar(avatar.getAvatar());
  }


  public String changePassword(PasswordModel passwordModel, int id) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
    if (!user.getPassword().equals(passwordModel.getOldPassword())) {
      throw new NotFoundException("PassWord khong chinh xac " + passwordModel.getOldPassword());
    }
    if (passwordModel.getNewPassword().equals(passwordModel.getOldPassword())) {
      throw new NotFoundException("PassWord moi va cu bi trung");
    } else {
      user.setPassword(passwordModel.getNewPassword());
    }
    return user.getPassword();
  }


  public String forgotPassword(int id) {
    User user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Khong ton tai id " + id));
    user.setPassword(faker.internet().password());

    mailService.sendMail(user.getEmail(), "Quen mat khau", "mat khau moi " + user.getPassword());
    return user.getPassword();
  }

  public String uploadFile(int id, MultipartFile file) {
    userRepository.findById(id).orElseThrow(() ->
            new NotFoundException("User not found with id: " + id));
    return fileService.uploadFile(id, file);

  }

  public byte[] readFile(int id, String fileId) {
    userRepository.findById(id).orElseThrow(() ->
            new NotFoundException("User not found with id: " + id));
    return fileService.readFile(id, fileId);
  }

  public List<String> getFiles(int id) {
    userRepository.findById(id).orElseThrow(() ->
            new NotFoundException("User not found with id: " + id));

    return fileService.getFiles(id);
  }

  public void deleteFile(int id, String fileId) {
    userRepository.findById(id).orElseThrow(() ->
            new NotFoundException("User not found with id: " + id));
    fileService.deleteFile(id, fileId);
  }

  public void updateAvatar(int id, UpdateAvatarRequest request) {
    User user = userRepository.findById(id).orElseThrow(() -> {
      throw new NotFoundException("Not found user with id = " + id);
    });
    user.setAvatar(request.getAvatar());
  }
}
