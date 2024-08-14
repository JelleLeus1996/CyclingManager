export interface User {
    userId: number,
    teamId: number;
    email: string;
    password_hash: string;
    roles: string;
}

export interface UserWithPassword extends User {
    password:string
}
