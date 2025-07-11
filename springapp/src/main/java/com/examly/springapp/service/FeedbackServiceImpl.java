package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;


import com.examly.springapp.repository.UserRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService{

    @Autowired
    private FeedbackRepo repo;

    @Autowired
    private UserRepo uRepo;

    public Feedback addFeedback(Feedback feedback){
      return repo.save(feedback);
    }
  
     public List<Feedback> getAllFeedbacks(){
        return repo.findAll();
      }
      public boolean deleteFeed(int id){
        if(repo.existsById(id)){
            repo.deleteById(id);
            return true;
        }
        return false;
      }
      public List<Feedback> getFeedbackByUserId(int userId){
        if(uRepo.existsById(userId)){
            return repo.findBytheUsersId(userId);    
        }else{
        return null;
        }

      }
}


