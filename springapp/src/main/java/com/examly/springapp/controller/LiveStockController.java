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

import com.examly.springapp.exceptions.DuplicateLiveStockException;
import com.examly.springapp.exceptions.LiveStockReferencedException;
import com.examly.springapp.model.LiveStock;
import com.examly.springapp.service.LiveStockService;

@RestController
public class LiveStockController {
    
    @Autowired
    private LiveStockService service;

    @PostMapping("/api/livestock")
    @PreAuthorize("hasAuthority('OWNER')")
    ResponseEntity<?> addLiveStock(@RequestBody LiveStock liveStock){
        try {
            LiveStock add = service.addLiveStock(liveStock);
            if(add != null){
                return new ResponseEntity<>(add,HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (DuplicateLiveStockException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    @GetMapping("/api/livestock/user/{userId}")
    @PreAuthorize("hasAuthority('OWNER')")
    ResponseEntity<List<LiveStock>> getLiveStocksByUserId(@PathVariable int userId){
        List<LiveStock> livestock = service.getLiveStocksByUserId(userId);
        if(livestock.size() > 0 ){
            return new ResponseEntity<>(livestock,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/api/livestock/{livestockId}")
    @PreAuthorize("hasAuthority('OWNER')")
    ResponseEntity<?> updateLiveStock(@PathVariable int livestockId,@RequestBody LiveStock updatedLiveStock){
        try {
            LiveStock livestock = service.updateLiveStock(livestockId, updatedLiveStock);
            if(livestock != null){
                return new ResponseEntity<>(livestock,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (DuplicateLiveStockException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        } 
        
    }

    @DeleteMapping("/api/livestock/{livestockId}")
    @PreAuthorize("hasAuthority('OWNER')")
    ResponseEntity<?> deleteLiveStock(@PathVariable int livestockId){
        try {
            boolean livestock = service.deleteLiveStock(livestockId);
            if(livestock){
                return new ResponseEntity<>(livestock,HttpStatus.OK);
            }
            return new ResponseEntity<>(livestock,HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (LiveStockReferencedException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/livestock")
    @PreAuthorize("hasAuthority('OWNER')")
    ResponseEntity<List<LiveStock>> getAllLiveStock(){
        List<LiveStock> livestock = service.getAllLiveStock();
        if(livestock.size() > 0 ){
            return new ResponseEntity<>(livestock,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/api/livestock/{id}")
    @PreAuthorize("hasAuthority('OWNER') or hasAuthority('SUPPLIER')")
    ResponseEntity<Optional<LiveStock>> getLiveStockById(@PathVariable int id){
        Optional<LiveStock> livestock = service.getLiveStockById(id);
        if(livestock.isPresent()){
            return new ResponseEntity<>(livestock,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
