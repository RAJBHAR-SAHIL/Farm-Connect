package com.examly.springapp.exceptions;

public class DuplicateFeedException extends RuntimeException{
    public DuplicateFeedException(String msg){
        super(msg);
    }
}
