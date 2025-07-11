package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Medicine;

@Repository
public interface MedicineRepo extends JpaRepository<Medicine, Integer> {
    @Query("from Medicine m where m.user.userId=:userId")
    List<Medicine> findByUserId(int userId);

    boolean existsByMedicineNameAndBrand(String medicineName, String brand);

    boolean existsByMedicineName(String medicineName);

}
