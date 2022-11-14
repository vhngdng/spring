package vn.techmaster.firstweb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {

    // path: GET  /api/v1/helloWorld => Hello World
    @GetMapping("/api/v1/helloworld")
    public String getHello() {
        return "Hello World";
    }
}
