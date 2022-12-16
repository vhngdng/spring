package com.example.test.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    private int id;
    private String name;
    private String email;
    private String phone;
    private List<String> address;
    private String avatar;
    private String password;
}
