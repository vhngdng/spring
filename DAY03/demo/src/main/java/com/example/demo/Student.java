package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Component
public class Student {
    private String name;
    private String email;

//    @Qualifier("bus")
    private Vehicle vehicle;


    public void showVehicle() {
        vehicle.run();
    }
    public void hello() {
        System.out.println("Xin chao Student");
    }

    public void showInfo() {
        System.out.println("Name - " + this.name + " - Email - " + this.email);
    }

    public Student(String name, String email) {
        this.name = name;
        this.email = email;
    }
    @Autowired
    public Student(@Qualifier("bus") Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
