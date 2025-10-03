import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ITest } from '@app/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userServiceService: UserService) {}

  @GrpcMethod('UserService', 'Test')
  test(data: ITest): ITest {
    return this.userServiceService.Test(data);
  }
  
}
