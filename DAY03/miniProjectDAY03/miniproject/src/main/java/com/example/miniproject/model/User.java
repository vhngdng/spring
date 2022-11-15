package com.example.miniproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private Integer id;
    @NotBlank
    private String name;
    private String email;
    private String phone;
    private String avater;
}
