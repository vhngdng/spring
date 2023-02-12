package com.example.jpabasic;

import com.github.javafaker.Faker;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JpaBasicApplication {

	public static void main(String[] args) {
		SpringApplication.run(JpaBasicApplication.class, args);
	}

	@Bean
	public Faker faker() {
		return new Faker();
	}
}
