
// User Interface

export interface IUserRegInterface {
    name: string;
    password: string;
    email: string;
    role: string;
    otp: number,
    status: 'Active' | 'In Active';
}
