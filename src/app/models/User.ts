export interface User {
    userName?: string,
    displayName: string,
    email: string,
    token: string,
    roles: string[],
}
export class User implements User {
    userName?: string = ''
    displayName: string = ''
    email: string = ''
    token: string = ''
    roles: string[] = []
}
export class UserFormValues {
    email?: string
    userName?: string
    displayName?: string
    password: string = ''
    constructor(user?: User) {
        if (user) {
            this.email = user.email
            this.userName = user.userName
            this.displayName = user.displayName
        }
    }
}

export class ChangePasswordFormValues {
    password: string = ''
    newPassword: string = ''
}