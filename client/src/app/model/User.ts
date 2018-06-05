export class UserModel {
  constructor(public firstName: string,
              public lastName: string,
              public username: string,
              public thumbnail: string,
              public email: string,
              public password: string,
              public isOnline: boolean,
              public socketId?: string) { }
}
