package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.model.Request;
import com.examly.springapp.service.RequestService;

@RestController

public class RequestController {

    @Autowired
    private RequestService service;

    @PostMapping("/api/request")
    @PreAuthorize("hasAuthority('OWNER')")
    ResponseEntity<Request> addRequest(@RequestBody Request request) {
        Request add = service.addRequest(request);
        if (add != null) {
            return new ResponseEntity<>(add, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/api/request/user/{userId}")
    @PreAuthorize("hasAuthority('SUPPLIER') or hasAuthority('OWNER')")
    ResponseEntity<List<Request>> getAllMyRequest(@PathVariable int userId) {
        List<Request> request = service.getAllMyRequest(userId);
        if (request.size() > 0) {
            return new ResponseEntity<>(request, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @DeleteMapping("/api/request/{requestId}")
    @PreAuthorize("hasAuthority('OWNER')")
    ResponseEntity<Boolean> deleteRequest(@PathVariable int requestId) {
        boolean request = service.deleteRequest(requestId);
        if (request) {
            return new ResponseEntity<>(request, HttpStatus.OK);
        }
        return new ResponseEntity<>(request, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/api/request/{requestId}")
    @PreAuthorize("hasAuthority('SUPPLIER')")
    ResponseEntity<Request> updateRequest(@PathVariable int requestId, @RequestBody Request request) {
        Request requestM = service.updateRequest(requestId, request);
        if (requestM != null) {
            return new ResponseEntity<>(requestM, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/api/request")
    ResponseEntity<List<Request>> getAllRequest() {
        List<Request> request = service.getAllRequest();
        if (request.size() > 0) {
            return new ResponseEntity<>(request, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @GetMapping("/api/request/{requestId}")
    @PreAuthorize("permitAll()")
    ResponseEntity<Optional<Request>> getRequestById(@PathVariable int requestId) {
        Optional<Request> request = service.getRequestById(requestId);
        if (request.isPresent()) {
            return new ResponseEntity<>(request, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }

}