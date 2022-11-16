package com.example.test.controller;

import com.example.test.PasswordChange.PasswordModel;
import com.example.test.controller.outer.Data;
import com.example.test.dto.UserDTO;
import com.example.test.dto.UserSignUp;
import com.example.test.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class userController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public UserDTO findUserById (@PathVariable(value = "id") int id) {
        return userService.findById(id);
    }



    @GetMapping("search")
    public UserDTO findUserByName(@RequestParam(value = "name") String name) {
        return userService.findByName(name);
    }

    @GetMapping()
    public Data findUserPaging(@RequestParam(value = "page", defaultValue = "1") int page,
                               @RequestParam(value = "limit", defaultValue = "10") int limit){

        return  userService.findUserPaging(page, limit);
    }


    @PostMapping()
    public UserDTO createUser(@RequestBody UserSignUp userSignUp) {
        return userService.createUser(userSignUp);

    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id) {
         userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@RequestBody UserDTO userDTO, @PathVariable("id") int id) {
        return userService.updateUser(userDTO, id);
    }

        @PutMapping("/{id}/update-avatar")
    public void changeAvatar(@RequestBody Avatar avatar, @PathVariable("id") int id) {
         userService.changeAvatar(avatar, id);

    }

    @PutMapping("/{id}/update-password")
    public void changePassword(@RequestBody PasswordModel passwordModel, @PathVariable("id") int id) {
        userService.changePassword(passwordModel, id);
    }

    @PostMapping("/{id}/fotgot-password")
    public String forgotPassword(@PathVariable("id") int id) {
        return userService.forgotPassword(id);
    }
}
