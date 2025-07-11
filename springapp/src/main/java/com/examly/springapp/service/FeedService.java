package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.exceptions.FeedReferencedException;
import com.examly.springapp.model.Feed;

public interface FeedService {
    public Feed addFeed(Feed feed);
    public Optional<Feed> getFeedById(int feedId);
    public List<Feed> getAllFeeds();
    public Feed updateFeed(int id,Feed updatedFeed);
    public List<Feed> getFeedsByUserId(int userId);
    public boolean deleteFeed(int feedId) throws FeedReferencedException;
}
