package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.LiveStock;

@Repository
public interface LiveStockRepo extends JpaRepository<LiveStock, Integer> {
    @Query("from LiveStock l where l.user.userId=:userId")
    List<LiveStock> findByUserId(int userId);

    boolean existsByNameAndBreedAndSpecies(String name, String breed, String species);
}
