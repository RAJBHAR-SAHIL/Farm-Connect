package com.examly.springapp.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
 
import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackServiceImpl;
 
@RestController
public class FeedbackController {
    @Autowired
    private  FeedbackServiceImpl service;
    @PostMapping("/api/feedback")
    @PreAuthorize("hasAuthority('OWNER')")
    public ResponseEntity<?> createFeedBacks(@RequestBody Feedback feedback){
        Feedback feed=service.addFeedback(feedback);
        if(feed!=null){
            return ResponseEntity.status(201).body(feed);
        }
        else{
            return ResponseEntity.status(501).build();
        }
    }
    @GetMapping("/api/feedback/user/{userId}")
    @PreAuthorize("hasAuthority('OWNER')")
    public ResponseEntity<?> getById(@PathVariable int userId){
        List<Feedback> list=service.getFeedbackByUserId(userId);
        if(list==null || list.size()>0){
            return ResponseEntity.status(200).body(list);
 
        }else{
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/api/feedback")
    public ResponseEntity<?> getAll(){
        List<Feedback> list2=service.getAllFeedbacks();
        if(list2.size()>0){
            return ResponseEntity.status(200).body(service.getAllFeedbacks());
        }else{
            return ResponseEntity.status(500).build();
        }
    }
    @DeleteMapping("api/feedback/{feedbackId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> deletebyId(@PathVariable int feedbackId){
        boolean b=service.deleteFeed(feedbackId);
        if(b){
            return ResponseEntity.status(201).body("{\"msg\":\"deleted successfully\"}");
        }else{
            return ResponseEntity.status(500).build();
        }
    }
 
   
}
 