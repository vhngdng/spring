package com.example.springsecurity.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {
  @GetMapping("/")
  public String getHome() {
    return "home page";
  }
}
