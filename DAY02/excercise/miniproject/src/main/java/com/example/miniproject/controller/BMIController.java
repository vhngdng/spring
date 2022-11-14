package com.example.miniproject.controller;

import com.example.miniproject.service.BMIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BMIController {
    @Autowired
    private BMIService bmiService;

    @PostMapping("/bmi")
    public double createBMI(@RequestParam(value = "height") double heightValue,
                            @RequestParam(value = "weight") int weightValue) {
        return bmiService.findBmi(heightValue, weightValue);

    }

}
