package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateLiveStockException;
import com.examly.springapp.exceptions.LiveStockReferencedException;
import com.examly.springapp.model.LiveStock;
import com.examly.springapp.repository.LiveStockRepo;
import com.examly.springapp.repository.RequestRepo;

@Service
public class LiveStockServiceImpl implements LiveStockService{
    
    @Autowired
    private LiveStockRepo repo;

    @Autowired
    private RequestRepo rRepo;

    @Override
    public LiveStock addLiveStock(LiveStock liveStock) throws DuplicateLiveStockException{
        if(repo.existsByNameAndBreedAndSpecies(liveStock.getName(), liveStock.getBreed(), liveStock.getSpecies())){
            throw new DuplicateLiveStockException("Livestock with the same name, breed and species already exists");
        }
        return repo.save(liveStock);
    }

    @Override
    public List<LiveStock> getLiveStocksByUserId(int userId) {
        return repo.findByUserId(userId);
    }
    
    @Override
    public LiveStock updateLiveStock(int id, LiveStock updatedLiveStock) throws DuplicateLiveStockException{
        if(repo.existsByNameAndBreedAndSpecies(updatedLiveStock.getName(), updatedLiveStock.getBreed(), updatedLiveStock.getSpecies())){
            throw new DuplicateLiveStockException("Livestock with the same name, breed and species already exists");
        }
        if(repo.existsById(id)){
            updatedLiveStock.setLivestockId(id);
            return repo.save(updatedLiveStock);
        }
        return null;
    }

    @Override
    public boolean deleteLiveStock(int id) throws LiveStockReferencedException{
        if(repo.existsById(id)){
            if(rRepo.existByLivestockId(id)){
                throw new LiveStockReferencedException("Livestock cannot be deleted, it is referenced in request");
            }
            repo.deleteById(id);
            return true;
        }
        return false;
    }    

    @Override
    public List<LiveStock> getAllLiveStock() {
        return repo.findAll();
    }

    @Override
    public Optional<LiveStock> getLiveStockById(int id) {
        if(repo.existsById(id)){
            return repo.findById(id);
        }
        return Optional.empty();
    }

    public boolean existsByNameAndBreedAndSpecies(String name, String breed, String species){
        return existsByNameAndBreedAndSpecies(name, breed, species);
    }
}
