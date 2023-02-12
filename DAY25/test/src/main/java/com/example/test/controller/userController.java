package com.example.test.controller;

import com.example.test.PasswordChange.PasswordModel;
import com.example.test.controller.outer.Data;
import com.example.test.dto.UserDTO;
import com.example.test.request.UserSignUp;
import com.example.test.request.UpdateAvatarRequest;
import com.example.test.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class userController {
  @Autowired
  private UserService userService;

  @GetMapping("/users/{id}")
  public UserDTO findUserById(@PathVariable(value = "id") int id) {
    return userService.findById(id);
  }


  @GetMapping("/users/search")
  public List<UserDTO> findUserByName(@RequestParam(value = "name") String name) {
    return userService.findByName(name);
  }

  @GetMapping("/users")
  public Data findUserPaging(@RequestParam(value = "page", defaultValue = "1") int page,
                             @RequestParam(value = "limit", defaultValue = "10") int limit) {
    return userService.findUserPaging(page, limit);
  }

  @GetMapping("/users/all")
  public List<UserDTO> findAll() {
    return userService.findAllUser();
  }


  @PostMapping("/users")
  public UserDTO createUser(@RequestBody UserSignUp userSignUp) {
    return userService.createUser(userSignUp);

  }

  @DeleteMapping("/users/{id}")
  public void deleteUser(@PathVariable("id") int id) {
    userService.deleteUser(id);
  }

  @PutMapping("/users/{id}")
  public UserDTO updateUser(@RequestBody UserDTO userDTO, @PathVariable("id") int id) {
    return userService.updateUser(userDTO, id);
  }

//  @PutMapping("/users/{id}/update-avatar")
//  public void changeAvatar(@RequestBody Avatar avatar, @PathVariable("id") int id) {
//    userService.changeAvatar(avatar, id);
//
//  }

  @PostMapping("/users/{id}/update-password")
  public String changePassword(@RequestBody PasswordModel passwordModel, @PathVariable("id") int id) {
    return userService.changePassword(passwordModel, id);
  }

  @GetMapping("/users/{id}/fotgot-password")
  public String forgotPassword(@PathVariable("id") int id) {
    return userService.forgotPassword(id);
  }

  // upload anh
  //c1: luu truc tiep vao database
  // c2: luu anh vao 1 folder o server -> luu path image vao database
  // Trong truong hop khong co database: luu anh vao 1 folder o server -> su dung userId, fileId de tim kiem trong folder

  //uploads
  // 1, 2, 3: folder tuong ung voi userId
  // trong folder userId la cac anh ma user do upload


  // Upload file
  @PostMapping("/users/{id}/files")
  public ResponseEntity<?> uploadFile(@PathVariable int id, @ModelAttribute("file") MultipartFile file) {
    String filePath = userService.uploadFile(id, file);
    return ResponseEntity.ok(filePath);
  }

  // xem anh -> byte[]
  @GetMapping("/users/{id}/files/{fileId}")
//   @GetMapping("/users/{id}/files/{fileId}", produces ="" -> kieu du lieu tra ve)
  public ResponseEntity<?> readFile(@PathVariable int id, @PathVariable String fileId) {
    byte[] bytes = userService.readFile(id, fileId);
    return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(bytes);
  }

  //Lay danh sach anh
  // /api/v1/users/1/files/1671023312
  // /api/v1/users/1/files/1671023312
  // /api/v1/users/1/files/1671023312
  @GetMapping("/users/{id}/files")
  public ResponseEntity<?> getFile(@PathVariable int id) {
    List<String> files = userService.getFiles(id);
    return ResponseEntity.ok(files);
  }

  //Xoa anh
  @DeleteMapping("/users/{id}/files/{fileId}")
  public ResponseEntity<?> deleteFile(@PathVariable int id, @PathVariable String fileId) {
    userService.deleteFile(id, fileId);
    return ResponseEntity.noContent().build();  //204
  }


  @PutMapping("/users/{id}/update-avatar")
  public ResponseEntity<?> updateAvatar(@PathVariable int id, @RequestBody UpdateAvatarRequest request) {
    userService.updateAvatar(id, request);
    return ResponseEntity.noContent().build();
  }

};

