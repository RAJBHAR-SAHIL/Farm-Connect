package com.examly.springapp.service;

import com.examly.springapp.exceptions.UsernameAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;

public interface UserService {
    User createUser(User user) throws UsernameAlreadyExistsException;
    LoginDTO loginUser(User user);

}
