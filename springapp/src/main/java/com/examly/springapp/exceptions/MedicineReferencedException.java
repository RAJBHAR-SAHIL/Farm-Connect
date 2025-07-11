package com.examly.springapp.exceptions;

public class MedicineReferencedException extends RuntimeException{
  public MedicineReferencedException(){}
  public MedicineReferencedException(String msg){
    super(msg);
  }
    
}
