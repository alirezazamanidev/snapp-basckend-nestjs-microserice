import { Observable } from "rxjs";


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
    otp: string;
}
export class ICheckOtpRequest {
    otp: string;
    phone: string;
    ip: string;
    userAgent: string;
}
export class ICheckOtpResponse {
    message: string;
    sessionId: string;
}
export interface IAuthService {
    sendOtp(request: ISendOtpRequest): Promise<ISendOtpResponse>;
    checkOtp(request: ICheckOtpRequest): Observable<ICheckOtpResponse>;
}