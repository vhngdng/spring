package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.entity.Blog;
import com.example.demo.entity.User;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.UpSertUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private BlogRepository blogRepository;

  public UserDTO findAuthorWithBlogId(int id) {
    Blog blog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    return new UserDTO(blog.getUser().getId(), blog.getUser().getName());
  }

  public List<User> getAllUser() {
    return userRepository.findAll();
  }

  public User createUser(UpSertUserRequest request) {
    return userRepository.save(new User(request.getName(), request.getEmail(), request.getAvatar(), request.getPassword()));
  }

  public User getUserById(Integer id) {
    return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User is not exist with id: " + id));
  }

  public User updateUser(Integer id, UpSertUserRequest request) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Blog Id not found " + id));
    if(request.getName() != null) user.setName(request.getName());
    if(request.getEmail() != null) user.setEmail(request.getEmail());
    if(request.getAvatar() != null) user.setAvatar(request.getAvatar());
    if(request.getPassword() != null) user.setPassword(request.getPassword());
    return  userRepository.save(user);
  }

  public void deleteById(Integer id) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User Id not found " + id));
    userRepository.delete(user);
  }
}
