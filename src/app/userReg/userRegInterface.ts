

export interface UserRegInterface {
    name?: string;
    password?: string;
    email: string;
    role?: "user";
    otp?: number
}
