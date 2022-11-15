package com.example.demo;

import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component("bike")
//@Primary
public class Bike implements Vehicle{
    @Override
    public void run() {
        System.out.println("Di hoc bang xe dap");
    }
}
