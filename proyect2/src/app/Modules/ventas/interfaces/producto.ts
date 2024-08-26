export interface Product{
    productId:number;
    productName:string;
    description:string;
    price: number ;
    stock:number;

}

export interface ProductCart{
    productName:string;
    description:string;
    price: number ;

}