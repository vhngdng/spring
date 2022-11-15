package com.example.demo;

import org.springframework.stereotype.Component;

@Component("bus")
public class Bus implements Vehicle{
    @Override
    public void run() {
        System.out.println("Di hoc bang xe bus");
    }
}
