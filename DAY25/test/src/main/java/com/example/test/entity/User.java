package com.example.test.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    private Integer id;
    @Column
    @Size(min = 4, max = 64, message = "length of name is not valid")
    private String name;
    @Column
    @Email
    private String email;
    @Column
    @Size(min = 4, max = 64, message = "length of phone is not valid")
    private String phone;
    @Column
    @Size(min = 4, max = 64, message = "length of address is not valid")
    private String address;
    @Column
    private String avatar;
    @Column
    @Size(min = 4, max = 64, message = "length of password is not valid")
    private String password;
}
