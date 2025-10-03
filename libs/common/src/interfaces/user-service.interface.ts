

export const USER_PACKAGE_NAME = 'user';
export const USER_SERVICE_NAME = 'UserService';

export class ITest {
    msg: string;
}
export interface IUserService {
    Test(request: ITest): Promise<ITest>;
}