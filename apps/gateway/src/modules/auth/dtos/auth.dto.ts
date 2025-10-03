import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, IsString, Length } from "class-validator";


export class SendOtpDto {
    @ApiProperty({
        description: 'The phone number to send OTP to',
        example: '09123456789',
    })
    @IsNotEmpty()
    @IsMobilePhone('fa-IR')
    phone: string;
}
export class checkOtpDto {
    @ApiProperty({
        description: 'The OTP to check',
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    @Length(5,5)
    otp: string;
    @ApiProperty({
        description: 'The phone number to check OTP for',
        example: '09123456789',
    })
    @IsNotEmpty()
    @IsMobilePhone('fa-IR')
    phone: string;
}