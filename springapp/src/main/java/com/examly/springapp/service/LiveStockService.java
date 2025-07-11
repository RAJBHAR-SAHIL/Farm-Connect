package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.exceptions.DuplicateLiveStockException;
import com.examly.springapp.exceptions.LiveStockReferencedException;
import com.examly.springapp.model.LiveStock;

public interface LiveStockService {
    public LiveStock addLiveStock(LiveStock liveStock) throws DuplicateLiveStockException;
    public List<LiveStock> getLiveStocksByUserId(int userId);
    public List<LiveStock> getAllLiveStock();
    public Optional<LiveStock> getLiveStockById(int id);
    public LiveStock updateLiveStock(int id, LiveStock updatedLiveStock) throws DuplicateLiveStockException;
    public boolean deleteLiveStock(int id) throws LiveStockReferencedException;
    public boolean existsByNameAndBreedAndSpecies(String name, String breed, String species);
}
