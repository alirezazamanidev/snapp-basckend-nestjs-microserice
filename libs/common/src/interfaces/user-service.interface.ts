

export const USER_PACKAGE_NAME = 'user';
export const USER_SERVICE_NAME = 'UserService';
export const AUTH_SERVICE_NAME = 'AuthService';
export class ITest {
    msg: string;
}
export interface IUserService {
    Test(request: ITest): Promise<ITest>;
}
export class ISendOtpRequest {
    phone: string;
}
export class ISendOtpResponse {
    message: string;
    
}
export interface IAuthService {
    sendOtp(request: ISendOtpRequest): Promise<ISendOtpResponse>;
}