package com.example.demo14.controller;


import com.example.demo14.entity.Input;
import com.example.demo14.service.BMIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BMIController {
    @Autowired
    private BMIService bmiService;

    @GetMapping("/bmi-get")
    public double createBMIPost(@RequestParam(value = "height") double heightValue,
                            @RequestParam(value = "weight") double weightValue) {
        return bmiService.findBmi(heightValue, weightValue);
    }

    @PostMapping("/bmi-post")
    public double createBMIGet(@RequestBody Input model) {
        return bmiService.findBmi(model);
    }
}
