export interface InputUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirm: string,
    role: ROLE,
    avatar: string
}

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: ROLE,
    password: string,
    avatar: object,
    confirmed: boolean
}

export type ROLE = "ADMIN" | "USER";