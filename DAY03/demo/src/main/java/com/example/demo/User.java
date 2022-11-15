package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Component
public class User{
    private String name;
    private String email;

    public void showInfo() {
        System.out.println("Name " + this.name + " - Email" + this.email);
    }

    public void hello() {
        System.out.println("Xin chao");
    }
}
