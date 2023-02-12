package com.example.test.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



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
    private String address;
    @NotNull(message = "password is not valid")
    private String password;
}
