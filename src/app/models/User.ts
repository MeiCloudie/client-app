export interface User {
    displayName: string,
    email: string,
    token: string,
    roles: string[],
}

export interface UserFormValues {
    email: string,
    username?: string,
    displayName?: string,
    password: string
}