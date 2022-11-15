package com.example.miniproject.repository;

import com.example.miniproject.model.Course;
import com.example.miniproject.model.User;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository

public class UserRepository {
    private List<User> users;


    private final Faker faker;

    private UserRepository(Faker faker) {
        this.faker = faker;
        initUsers();
    }

    private void initUsers() {
        users = new ArrayList<>();
        for (int i = 1; i < 4; i++) {
            User user = new User(i, faker.name().fullName(),
                    faker.internet().emailAddress(),
                    faker.phoneNumber().phoneNumber(),
                    faker.avatar().image());
            users.add(user);
        }
    }
    public List<User> findAll() {
        return users;
    }

    public Optional<User> findByid(Integer userId) {
        Optional<User> user = users.stream().filter(c -> c.getId() == userId).findFirst();
        return user;
    }
}
