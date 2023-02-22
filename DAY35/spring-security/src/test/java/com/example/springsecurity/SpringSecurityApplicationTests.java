package com.example.springsecurity;

import com.example.springsecurity.entity.User;
import com.example.springsecurity.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest

class SpringSecurityApplicationTests {
	@Autowired
	UserRepository repository;

	@Test
	void contextLoads() {
	}

	@Test
	void save_userTest() {
		repository.save(User.builder().name("dung").email("dung@gmail.com").password("1").role("ADMIN").build());
		repository.save(User.builder().name("dung1").email("dung1@gmail.com").password("1").role("USER").build());

	}

}
