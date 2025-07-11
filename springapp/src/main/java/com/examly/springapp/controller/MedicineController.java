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

import com.examly.springapp.exceptions.DuplicateMedicineException;
import com.examly.springapp.exceptions.MedicineReferencedException;
import com.examly.springapp.model.Medicine;
import com.examly.springapp.service.MedicineService;

@RestController
public class MedicineController {
    @Autowired
    MedicineService service;

    @PostMapping("/api/medicine")
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<?> addMedicine(@RequestBody Medicine medicine) {
        try {
            medicine = service.addMedicine(medicine);
            return new ResponseEntity<>(medicine, HttpStatus.CREATED);
        } catch (DuplicateMedicineException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/api/medicine/{medicineId}")
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<?> updateMedicine(@PathVariable int medicineId, @RequestBody Medicine medicine) {
        try {
            medicine = service.updateMedicine(medicineId, medicine);
            if (medicine != null) {
                return new ResponseEntity<>(medicine, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (DuplicateMedicineException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }

    }

    @DeleteMapping("/api/medicine/{medicineId}")
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<?> deleteMedicine(@PathVariable int medicineId) {
        try {
            boolean del = service.deleteMedicine(medicineId);
            if (del) {
                return new ResponseEntity<>(del, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (MedicineReferencedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }

    }

    @GetMapping("/api/medicine")
    @PreAuthorize("hasAuthority('OWNER') or hasAuthority('SUPPLIER')")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        List<Medicine> list = service.getAllMedicines();
        if (list.size() != 0) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/medicine/{id}")
    @PreAuthorize("hasAuthority('OWNER') or hasAuthority('SUPPLIER')")
    public ResponseEntity<Optional<Medicine>> getById(@PathVariable int id) {
        Optional<Medicine> medicine = service.getMedicineById(id);
        if (medicine.isPresent()) {
            return new ResponseEntity<>(medicine, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/medicine/user/{id}")
    @PreAuthorize("hasAuthority('OWNER') or hasAuthority('SUPPLIER')")
    public ResponseEntity<List<Medicine>> getByUserId(@PathVariable int id) {
        List<Medicine> list = service.getMedicineByUserId(id);
        if (list.size() != 0) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return ResponseEntity.status(200).body(service.getMedicineByUserId(id));
    }

}
