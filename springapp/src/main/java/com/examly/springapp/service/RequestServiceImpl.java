package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feed;
import com.examly.springapp.model.LiveStock;
import com.examly.springapp.model.Medicine;
import com.examly.springapp.model.Request;
import com.examly.springapp.repository.FeedRepo;
import com.examly.springapp.repository.LiveStockRepo;
import com.examly.springapp.repository.MedicineRepo;
import com.examly.springapp.repository.RequestRepo;
import com.examly.springapp.repository.UserRepo;
import java.util.Collections;

@Service
public class RequestServiceImpl implements RequestService {

    @Autowired
    private RequestRepo repo;

    @Autowired
    private FeedRepo feedbackRepo;

    @Autowired
    private MedicineRepo medicineRepo;

    @Autowired
    private LiveStockRepo liveStockRepo;

    @Autowired
    private UserRepo uRepo;

    @Override
    public Request addRequest(Request request) {
        if (request.getFeed() != null && request.getFeed() != null) {
            Feed feed = feedbackRepo.findById(request.getFeed().getFeedId()).orElse(null);
            request.setFeed(feed);
        } else {
            request.setFeed(null);
        }

        if (request.getMedicine() != null && request.getMedicine() != null) {
            Medicine medicine = medicineRepo.findById(request.getMedicine().getMedicineId()).orElse(null);
            request.setMedicine(medicine);
        } else {
            request.setMedicine(null);
        }

        if (request.getLivestock() != null && request.getLivestock() != null) {
            LiveStock livestock = liveStockRepo.findById(request.getLivestock().getLivestockId()).orElse(null);
            request.setLivestock(livestock);
        } else {
            request.setLivestock(null);
        }

        return repo.save(request);
    }

    @Override
    public boolean deleteRequest(int requestId) {
        if (repo.existsById(requestId)) {
            repo.deleteById(requestId);
            return true;
        }
        return false;
    }

    @Override
    public List<Request> getAllMyRequest(int userId) {
        if (uRepo.existsById(userId)) {
            return repo.findByUserId(userId);
        }
        return Collections.emptyList();
    }

    @Override
    public List<Request> getAllRequest() {
        return repo.findAll();
    }

    @Override
    public Optional<Request> getRequestById(int requestId) {
        if (repo.existsById(requestId)) {
            return repo.findById(requestId);
        }
        return Optional.empty();
    }

    @Override
    public Request updateRequest(int requestId, Request request) {
        if (repo.existsById(requestId)) {
            request.setRequestId(requestId);
            return repo.save(request);
        }
        return null;
    }
}
