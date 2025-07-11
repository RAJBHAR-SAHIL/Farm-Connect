package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Feedback;

public interface FeedbackService {
      public Feedback addFeedback(Feedback feedback);
      public List<Feedback> getFeedbackByUserId(int userId);
      public List<Feedback> getAllFeedbacks();
      public boolean deleteFeed(int id);
}
