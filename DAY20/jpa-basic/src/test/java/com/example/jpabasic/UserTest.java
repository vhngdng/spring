package com.example.jpabasic;

import com.example.jpabasic.dto.UserDTO;
import com.example.jpabasic.dto.UserInfo;
import com.example.jpabasic.dto.UserInfo;
import com.example.jpabasic.dto.UserMapper;
import com.example.jpabasic.entity.User;
import com.example.jpabasic.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class UserTest {

  @Autowired
  private UserRepository userRepository;

  @Test
  void findByEmailContainingIgnoreCase_test() {
    List<UserDTO> userDTOList = userRepository.findByEmailContainingIgnoreCase("ding");
    userDTOList.forEach(System.out::println);
  }

  @Test
  void findByNameWithStartsWith_test() {
    List<User> users = userRepository.findByNameStartsWith("c");
    List<UserDTO> userDTOList = users.stream().map(UserMapper::toUserDTO).toList();
  }

  @Test
  void findAllUserDTO() {
    List<UserDTO> users = userRepository.findAllUserDTO();
    users.forEach(System.out::println);
  }

  @Test
  void findAllUserInfo() {
    List<UserInfo> userInfos = userRepository.findUserInfoById(4);
    userInfos.forEach(userInfo -> System.out.println(userInfo.getId() + " - " + userInfo.getName()));
  }
}
