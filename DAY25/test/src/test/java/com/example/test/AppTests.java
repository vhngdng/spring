package com.example.test;

import com.example.test.entity.User;
import com.example.test.repository.UserRepository;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.util.ArrayList;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class AppTests {
  @Autowired
  private Faker faker;
  @Autowired
  private UserRepository userRepository;

  @Test
  @Rollback(value = false)
  void testSaveUser() {
    List<User> users = new ArrayList<>(List.of(
            new User(
                    3,
                    faker.name().fullName(),
                    faker.internet().emailAddress(),
                    faker.phoneNumber().phoneNumber(),
                    "Thành phố Hà Nội",
                    faker.avatar().image(),
                    faker.internet().password())
            ,
            new User(
                    4,
                    faker.name().fullName(),
                    faker.internet().emailAddress(),
                    faker.phoneNumber().phoneNumber(),
                    "Thành phố Hà Nội",
                    faker.avatar().image(),
                    faker.internet().password())
    ));
    userRepository.saveAll(users);
  }

  @Test
  void initUser() {
//		for (int i = 1; i < 11; i++) {
//			User user = new User(
//							i,
//							faker.name().fullName(),
//							faker.internet().emailAddress(),
//							faker.phoneNumber().phoneNumber(),
//							"Thành phố Hà Nội",
//							faker.avatar().image(),
//							faker.internet().password());
//			users.add(user);
  }

  @Test
  void testFindUserDTOByNameContainsIgnoreCase() {
    userRepository.findUserDTOByNameContainsIgnoreCase("Mr");
  }
}

