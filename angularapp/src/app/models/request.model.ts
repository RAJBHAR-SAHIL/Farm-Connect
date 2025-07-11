export interface Request {
    requestId?:number;
    requestType?:string;    
    quantity:number;
    status:string;
    livestockId?:number;
    requestDate:string;
    rejectionReason?:string
    medicine?:{
        medicineId?:number;
        medicineName?:string
    }
    feed?:{
        feedId?:number,
        feedName?:string
    }
    user?:{
        userId?:number
    }
    livestock?:{
        livestockId?:number
    }
}
    