package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Feed;

@Repository
public interface FeedRepo extends JpaRepository<Feed, Integer> {
    @Query("from Feed f where f.user.userId=:userId")
    List<Feed> getFeedsByUserId(int userId);

    boolean existsByFeedNameAndType(String name, String type);

    boolean existsByFeedName(String feedName);

}
