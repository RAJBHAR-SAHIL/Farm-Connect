package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.UsernameAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.service.UserService;

@RestController
public class AuthController {

    UserRepo userRepo;
    UserService userService;

    @Autowired
    public AuthController(UserRepo userRepo, UserService userService) {
        this.userRepo = userRepo;
        this.userService = userService;
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try {
            User newUser = userService.createUser(user);
            if(newUser == null){
                return ResponseEntity.status(500).body("Registration unsuccessful");
            }
            return ResponseEntity.status(200).body(newUser);
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity.status(401).body("Registration unsuccessful");
        }
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        LoginDTO newUser = userService.loginUser(user);
        if(newUser == null){
            return ResponseEntity.status(401).body("Login unsuccessful");
        }
        
        return ResponseEntity.status(200).body(newUser);
    }
}
