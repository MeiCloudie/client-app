export interface User {
    userName?: string,
    displayName: string,
    email: string,
    token: string,
    roles: string[],
}

export interface UserFormValues {
    email?: string,
    userName?: string,
    displayName?: string,
    password: string
}