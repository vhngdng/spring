package com.example.test.repository;

import com.example.test.model.User;
import com.github.javafaker.Faker;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Repository
public class UserRepository {

    private final List<User> users = new ArrayList<>();
    private final Faker faker;

    public User save(User user) {
        int id = findLast().getId() + 1;
        user.setId(id);
        users.add(user);
        return findLast();
    }

    public List<User> findAll() {
        return users;
    }

    private UserRepository(Faker faker) {
        this.faker = faker;
        initUsers();
    }

    private void initUsers() {
        for (int i = 1; i < 21; i++) {
            User user = new User(
                    i,
                    faker.name().fullName(),
                    faker.internet().emailAddress(),
                    faker.phoneNumber().phoneNumber(),
                    faker.address().streetAddress(),
                    faker.avatar().image(),
                    faker.internet().password());
            users.add(user);
        }
    }

    public Optional<User> findUserById(int id) {
        return users.stream().filter(user -> user.getId() == id).findFirst();
    }

    public Optional<User> findByName(String name) {
        return users.stream().filter(user -> user.getName().contains(name)).findFirst();
    }

    public int count() {
        return users.size();
    }
    public User findLast() {
        return users.get( count() -1);
    }

    public void delete(User user) {
        users.remove(user);
    }
}
