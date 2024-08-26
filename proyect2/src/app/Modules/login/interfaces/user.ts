export interface User {
    UserId:number,
    Username:string,
    Email:string,
    PasswordHash:string,
    CreatedAt:string

}

export interface UserCreate {
    username: string;
    passwordHash: string;
    email?: string; // Opcional, si tu modelo de usuario incluye un email
    carts: any[] ;
  }
  