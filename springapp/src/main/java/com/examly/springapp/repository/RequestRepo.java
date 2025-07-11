package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Request;

@Repository
public interface RequestRepo extends JpaRepository<Request, Integer> {
    @Query("From Request r WHERE r.user.userId = :userId")
    List<Request> findByUserId(int userId);

    @Query("SELECT COUNT(r) > 0 FROM Request r WHERE r.livestock.livestockId = :livestockId")
    boolean existByLivestockId(int livestockId);

    @Query("Select count(r)>0 from Request r where r.medicine.medicineId=:medicineId")
    boolean existsByTheMedicineId(int medicineId);

    @Query("Select count(r)>0 from Request r where r.feed.feedId=:feedId")
    boolean existsByTheFeedId(int feedId);

    @Query("Select count(r)>0 from Request r where r.livestock.livestockId=:livestockId")
    boolean existsByTheLivestockId(int livestockId);
}