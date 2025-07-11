package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exceptions.DuplicateFeedException;
import com.examly.springapp.exceptions.FeedReferencedException;
import com.examly.springapp.model.Feed;
import com.examly.springapp.service.FeedService;

@RestController
public class FeedController {
    @Autowired
    private FeedService feedService;

    @PostMapping("/api/feed")
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<?> addFeed(@RequestBody Feed feed) {
        try {
            return ResponseEntity.status(201).body(feedService.addFeed(feed));
        } catch (DuplicateFeedException dfe) {
            return ResponseEntity.status(500).body(dfe.getMessage());
        }
    }

    @PutMapping("/api/feed/{feedId}")
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<?> updateFeed(@RequestBody Feed feed, @PathVariable int feedId) {
        try {
            return ResponseEntity.status(201).body(feedService.updateFeed(feedId, feed));
        } catch (DuplicateFeedException dfe) {
            return ResponseEntity.status(500).body(dfe.getMessage());
        }
    }

    @DeleteMapping("/api/feed/{feedId}")
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<?> deleteFeed(@PathVariable int feedId) {
        try {
            return ResponseEntity.status(201).body(feedService.deleteFeed(feedId));
        } catch (FeedReferencedException dfe) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(dfe.getMessage());
        }

    }

    @GetMapping("/api/feed")

    @PreAuthorize("hasAuthority('OWNER') or hasAuthority('SUPPLIER')")

    public ResponseEntity<?> getAllFeeds() {
        return ResponseEntity.status(200).body(feedService.getAllFeeds());
    }

    @GetMapping("/api/feed/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getFeedById(@PathVariable int id) {
        return ResponseEntity.status(200).body(feedService.getFeedById(id));
    }

    @GetMapping("/api/feed/user/{id}")
    @PreAuthorize("hasAuthority('SUPPLIER') or hasAuthority('OWNER')")
    public ResponseEntity<?> getFeedsByUserId(@PathVariable int id) {
        return ResponseEntity.status(200).body(feedService.getFeedsByUserId(id));
    }
}
