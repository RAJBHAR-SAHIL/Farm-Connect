package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.exceptions.DuplicateMedicineException;
import com.examly.springapp.exceptions.MedicineReferencedException;
import com.examly.springapp.model.Medicine;

public interface MedicineService {
    public Medicine addMedicine(Medicine medicine) throws DuplicateMedicineException;
    public Optional<Medicine> getMedicineById(int medicineId);
    public List<Medicine> getAllMedicines();
    public List<Medicine> getMedicineByUserId(int userId);
    public Medicine updateMedicine(int id,Medicine updateMedicine) throws DuplicateMedicineException;
    public boolean deleteMedicine(int medicineId) throws MedicineReferencedException;

}
