export class AuthUser {
    constructor(
                public userId:number,
                public username: string,
                public userRole: string,
                public token: string)
                {}
}