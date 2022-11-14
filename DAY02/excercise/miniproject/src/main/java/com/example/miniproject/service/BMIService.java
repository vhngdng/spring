package com.example.miniproject.service;

import com.example.miniproject.exception.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BMIService {
//    private static List<Bmi> bmis = new ArrayList<>();
    public double findBmi(double heightValue, int weightValue) {
        if (heightValue < 0 || weightValue < 0)
            throw new NotFoundException("value is not valid");
//        bmis.add(new Bmi(heightValue, weightValue));
        return weightValue/Math.pow(heightValue, 2);
    }
}
