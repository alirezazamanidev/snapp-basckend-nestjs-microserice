import { Controller } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { GrpcMethod, Payload } from "@nestjs/microservices";
import { ICheckOtpRequest, ICheckOtpResponse, ISendOtpRequest, ISendOtpResponse } from "@app/common";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @GrpcMethod('AuthService','sendOtp')
   sendOtp(@Payload() request: ISendOtpRequest): Promise<ISendOtpResponse> {
        return this.authService.sendOtp(request);
    }
    @GrpcMethod('AuthService','checkOtp')
    checkOtp(@Payload() payload: ICheckOtpRequest): Promise<ICheckOtpResponse> {
        return this.authService.checkOtp(payload);
    }
}