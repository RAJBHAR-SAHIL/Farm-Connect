package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateMedicineException;
import com.examly.springapp.exceptions.MedicineReferencedException;
import com.examly.springapp.model.Medicine;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.MedicineRepo;
import com.examly.springapp.repository.RequestRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    MedicineRepo repo;

    @Autowired
    UserRepo urepo;

    @Autowired
    RequestRepo rrepo;

    @Override
    public Medicine addMedicine(Medicine medicine) throws DuplicateMedicineException {
        if (repo.existsByMedicineNameAndBrand(medicine.getMedicineName(), medicine.getBrand())) {
            throw new DuplicateMedicineException("Medicine with the same name and brand already exists");
        } else if (repo.existsByMedicineName(medicine.getMedicineName())) {
            throw new DuplicateMedicineException("Medicine with the same name already exists with a different brand");
        }

        User u = urepo.findById(medicine.getUser().getUserId()).get();
        medicine.setUser(u);
        return repo.save(medicine);
    }

    @Override
    public boolean deleteMedicine(int medicineId) throws MedicineReferencedException {
        if (repo.existsById(medicineId)) {
            if (rrepo.existsByTheMedicineId(medicineId)) {
                throw new MedicineReferencedException("Medicine cannot be deleted, it is referenced in request");
            }
            repo.deleteById(medicineId);
            return true;

        }
        return false;
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return repo.findAll();
    }

    @Override
    public Optional<Medicine> getMedicineById(int medicineId) {
        if (repo.existsById(medicineId)) {
            return repo.findById(medicineId);
        }
        return Optional.empty();
    }

    @Override
    public List<Medicine> getMedicineByUserId(int userId) {
        if (urepo.existsById(userId)) {
            return repo.findByUserId(userId);
        }
        return null;
    }

    @Override
    public Medicine updateMedicine(int id, Medicine updateMedicine) throws DuplicateMedicineException {
        if (repo.existsById(id)) {
            if (repo.existsByMedicineNameAndBrand(updateMedicine.getMedicineName(), updateMedicine.getBrand())) {
                throw new DuplicateMedicineException("Medicine with the same name and brand already exists");
            } else if (repo.existsByMedicineName(updateMedicine.getMedicineName())) {
                throw new DuplicateMedicineException(
                        "Medicine with the same name already exists with a different brand");
            } else {
                updateMedicine.setMedicineId(id);
                return repo.save(updateMedicine);
            }

        }
        return null;
    }

}
