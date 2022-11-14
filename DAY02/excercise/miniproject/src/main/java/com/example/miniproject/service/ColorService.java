package com.example.miniproject.service;

import com.example.miniproject.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ColorService {
    public String getTypeValue(int type) {
        return switch (type) {
            case 1 -> randomColorName();
            case 2 -> randomHexColor();
            case 3 -> randomRgbColor();
            default -> throw new NotFoundException("Type khong hop le");
        };
    }

    private String randomRgbColor() {

//        List<String> colors = List.of("rgb(205, 92, 92)", "rgb(240, 128, 128)", "rgb(250, 128, 114)");
        String rgb = "rgb";
        Random rd = new Random();
        int r = rd.nextInt(256);
        int g = rd.nextInt(256);
        int b = rd.nextInt(256);
        return rgb + "(" + r + "," + " " + g + "," + " " + b + ")";
//        int index = new Random().nextInt(colors.size());
//        return colors.get(index);
    }

    private String randomHexColor() {
        int nextInt = new Random().nextInt(0xffffff + 1);
        return String.format("#%06x", nextInt);

    }

    private String randomColorName() {
        List<String> colors = List.of("red", "green", "blue", "black");
        int index = new Random().nextInt(colors.size());

        return colors.get(index);
    }
}
