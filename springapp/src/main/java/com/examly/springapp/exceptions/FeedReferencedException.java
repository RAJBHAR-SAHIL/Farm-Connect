package com.examly.springapp.exceptions;

public class FeedReferencedException extends RuntimeException{
    public  FeedReferencedException(){}
    public  FeedReferencedException(String msg){
        super(msg);
    }
    
}
