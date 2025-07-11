package com.examly.springapp.exceptions;

public class LiveStockReferencedException extends RuntimeException {
    public LiveStockReferencedException(){}
    public LiveStockReferencedException(String msg){
        super(msg);
    }

    
}
