package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import java.util.Random;

@SpringBootApplication
public class DemoApplication {
    //Tạo bean bằng cách đánh dấu annotation lên cláss
    //Controller, RestController, Service, Repository,....

    // -> Tạo ra 1 đối tượng duy nhâst(singleton pattern) -> đưa vaò application Context để quản lý
    // -> Khi muôns dùng 1 bean (inject bean)
    // 1. Sử dụng autơwỉred
    // 2. Sưr dụng constructỏr
    // 3. Sưr dụng settẻr

    // Sử dụng annotation đánh dâsu lên method
    // @Bean: Trả vêf 1 đôí tượng  -> chỉ được dùng trong class đc annotation @Configuration, @SpringbootApplication

    public static void main(String[] args) {

        ApplicationContext context =  SpringApplication.run(DemoApplication.class, args);
        User user = context.getBean(User.class);
        user.hello();
//        Student student = context.getBean(Student.class);
//        student.showInfo();
        Random random = context.getBean(Random.class);
        System.out.println(random.nextInt(1000));

        Student student1 = context.getBean("student1", Student.class);
        student1.showInfo();
        student1.showVehicle();
        Student student2 = context.getBean("student2", Student.class);
        student2.showInfo();
        Student student3 = context.getBean("student3", Student.class);
        student3.showInfo();


    }

    @Bean("student1")
    public Student createStudent() {
        return new Student("Nguyen Van A", "a@gmail.com");
    }

    @Bean("student2")
    public Student createStudent1() {
        return new Student("Tran Van B", "b@gmail.com");
    }

    @Bean
    public Random random() {
        return new Random();
    }


}
