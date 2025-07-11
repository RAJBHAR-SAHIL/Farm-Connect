package com.examly.springapp.exceptions;

public class DuplicateMedicineException extends RuntimeException {
    public DuplicateMedicineException(String s){
        super(s);
    }
}
