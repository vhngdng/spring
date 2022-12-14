package com.example.demo14.controller;

import com.example.demo14.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
public class ColorController {
    @Autowired
    private ColorService colorService;
    @GetMapping("/random-color")
    public String randomColor(@RequestParam int type) {
        return colorService.getTypeValue(type);
    }

//    @GetMapping("/random-color-rgb")
//    public String randomRgbColor (@RequestParam int type) {
//        return colorService.randomHexColor();
//    }

}
