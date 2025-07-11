import { User } from "./user.model";

export interface Medicine {
    medicineId?:number;
    medicineName:string;
    brand:string;
    category:string;
    description:string;
    quantity:number;
    unit:string;
    pricePerUnit:number;
    image?:string;
    user?:{
        userId:number
    } 
}
