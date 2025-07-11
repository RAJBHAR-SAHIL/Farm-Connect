export interface Feed {
    feedId?:number,
    feedName:string,
    type:string,
    description:string,
    quantity:number,
    unit:string,
    pricePerUnit:number,
    image?:string,
    user?:{
        userId:number
    } 
}
