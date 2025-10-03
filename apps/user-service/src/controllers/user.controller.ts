import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ITest } from '@app/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userServiceService: UserService) {}

}
