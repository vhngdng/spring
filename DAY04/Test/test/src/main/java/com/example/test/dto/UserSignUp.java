package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUp {
    @NotNull
    private String name;
    @NotNull
    private String email;
    @NotNull
    private String phone;
    @NotNull
    private List<String> address;
    @NotNull(message = "password is not valid")
    private String password;
}
