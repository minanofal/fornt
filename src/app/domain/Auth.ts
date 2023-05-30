import { UserLit } from "./User";

export interface Auth{
    id : string;
    message: string;
    userName: string;
    email: string;
    firstName : string;
    lastName : string;
    roles : string[];
    token : string;
    expire : string;
    isAuthenticated : boolean;
}

export interface SearchUsers{
    firstName: string,
    lastName : string,
    email: string,
    take: number,
    skip: number,
    roleId : string;
    pageIndex: number,
}

export interface responsUser{
    items : UserLit[],
    pageIndex: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
}

export interface RolesdropDown{
    name : string;
    id: string;
}

export interface UserRegister{
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId: string;
    phoneNumber: string;
    userName:string;
}