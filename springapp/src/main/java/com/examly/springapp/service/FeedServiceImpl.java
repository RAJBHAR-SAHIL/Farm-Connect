package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateFeedException;
import com.examly.springapp.exceptions.FeedReferencedException;
import com.examly.springapp.model.Feed;
import com.examly.springapp.repository.FeedRepo;
import com.examly.springapp.repository.RequestRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedServiceImpl implements FeedService {

    @Autowired
    private FeedRepo feedRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RequestRepo requestRepo;

    @Override
    public Feed addFeed(Feed feed) {
        if (feedRepo.existsByFeedNameAndType(feed.getFeedName(), feed.getType())) {
            throw new DuplicateFeedException("Feed with the same name and type already exists");
        } else if (feedRepo.existsByFeedName(feed.getFeedName())) {
            throw new DuplicateFeedException("Feed with the same name already exists");
        } else {
            return feedRepo.save(feed);
        }

    }

    @Override
    public boolean deleteFeed(int feedId) throws FeedReferencedException {
        if (feedRepo.existsById(feedId)) {
            if (requestRepo.existsByTheFeedId(feedId)) {
                throw new FeedReferencedException("Feed cannot be deleted, it is referenced in request");
            }
            feedRepo.deleteById(feedId);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Feed> getAllFeeds() {
        return feedRepo.findAll();
    }

    @Override
    public Optional<Feed> getFeedById(int feedId) {
        if (feedRepo.existsById(feedId)) {
            return feedRepo.findById(feedId);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public List<Feed> getFeedsByUserId(int userId) {
        if (userRepo.existsById(userId)) {
            return feedRepo.getFeedsByUserId(userId);
        } else {
            return null;
        }
    }

    @Override
    public Feed updateFeed(int id, Feed updatedFeed) {
        if (feedRepo.existsById(id)) {
            if (feedRepo.existsByFeedNameAndType(updatedFeed.getFeedName(), updatedFeed.getType())) {
                throw new DuplicateFeedException("Feed with the same name and type already exists");
            } else if (feedRepo.existsByFeedName(updatedFeed.getFeedName())) {
                throw new DuplicateFeedException("Feed with the same name already exists");
            } else {
                updatedFeed.setFeedId(id);
                return feedRepo.save(updatedFeed);
            }

        } else {
            return null;
        }
    }
}
