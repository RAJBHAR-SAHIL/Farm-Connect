package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Request {
    
    @Id
    @GeneratedValue
    private int requestId;
    private String requestType;
    private int quantity;
    private String status;
    private String rejectionReason;
    private LocalDate requestDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(optional = true)
    @JoinColumn(name = "feedId")
    private Feed feed;

    @ManyToOne(optional = true)
    @JoinColumn(name = "medicineId")
    private Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "livestockId")
    private LiveStock livestock;

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Feed getFeed() {
        return feed;
    }

    public void setFeed(Feed feed) {
        this.feed = feed;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public LiveStock getLivestock() {
        return livestock;
    }

    public void setLivestock(LiveStock livestock) {
        this.livestock = livestock;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
