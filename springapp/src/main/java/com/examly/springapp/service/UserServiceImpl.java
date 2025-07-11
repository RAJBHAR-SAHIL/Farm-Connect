package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.UsernameAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    UserRepo userRepo;
    PasswordEncoder passwordEncoder;
    AuthenticationManager authenticationManager;
    JwtUtils jwtUtils;

    @Autowired
    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils  ){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    
    @Override
    public User createUser(User user) throws UsernameAlreadyExistsException{
        User existUser = userRepo.findByUsername(user.getUsername());
        if(existUser != null){
          throw new UsernameAlreadyExistsException("Username or Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepo.save(user);
        return user; 
    }

    @Override
    public LoginDTO loginUser(User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtUtils.generateToken(user.getUsername());
            User mainUser = userRepo.findByUsername(user.getUsername());
           
            LoginDTO userInfo = new LoginDTO();
            userInfo.setUserId(mainUser.getUserId());
            userInfo.setUsername(mainUser.getUsername());
            userInfo.setUserRole(mainUser.getUserRole());
            userInfo.setToken(token);
            return userInfo;
        }
        return null;
    }
}
