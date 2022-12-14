package com.example.demo14.service;


import com.example.demo14.entity.Input;
import com.example.demo14.exception.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BMIService {
//    private static List<Bmi> bmis = new ArrayList<>();
    public double findBmi(double heightValue, double weightValue) {
        if (heightValue < 0 || weightValue < 0)
            throw new NotFoundException("value is not valid");
//        bmis.add(new Bmi(heightValue, weightValue));
        return weightValue/Math.pow(heightValue, 2);
    }

    public double findBmi(Input model) {
        double heightValue = model.getHeight();
        double weightValue = model.getWeight();
        if (heightValue < 0 || weightValue < 0)
            throw new NotFoundException("value is not valid");
//        bmis.add(new Bmi(heightValue, weightValue));
        return weightValue/Math.pow(heightValue, 2);
    }
}
