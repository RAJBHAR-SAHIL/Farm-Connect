package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Request;

public interface RequestService {
    public Request addRequest(Request request);
    public List<Request> getAllRequest();
    public List<Request> getAllMyRequest(int userId);
    public Optional<Request> getRequestById(int requestId);
    public boolean deleteRequest(int requestId);
    public Request updateRequest(int requestId, Request request);
}
