package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.projection.BlogProjection;
import com.example.demo.request.UpSertBlogRequest;
import com.example.demo.request.UpSertUserRequest;
import com.example.demo.service.UserService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("")
@Slf4j
public class UserController {
  @Autowired
  private UserService userService;

  @GetMapping("/author")
  UserDTO findAuthorWithBlogId(@RequestParam("blogId") int blogId) {
    return userService.findAuthorWithBlogId(blogId);
  }

  @GetMapping("/admin/all-users")
  public ResponseEntity<?> getAllUser() {
    return ResponseEntity.ok(userService.getAllUser());
  }
  // sign up
  @PostMapping("/user")
  public ResponseEntity<?> createUser(@RequestBody UpSertUserRequest request) {
    return new ResponseEntity<>(userService.createUser(request), HttpStatus.CREATED);
  }

  @GetMapping("/admin/{id}")
  public ResponseEntity<?> getUserById(@PathVariable Integer id) {
    return ResponseEntity.ok(userService.getUserById(id));
  }

  @PutMapping("/admin/{id}")
  public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody UpSertUserRequest request) {
    return ResponseEntity.ok(userService.updateUser(id, request));
  }

  @DeleteMapping("/admin/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
    userService.deleteById(id);
    return ResponseEntity.notFound().build();  //204
  }

  ///////////////////////// user authorize api
//   sign in
//  @GetMapping("")
//  public ResponseEntity<?> logIn(@RequestBody Login request) {
//
//  }


}
