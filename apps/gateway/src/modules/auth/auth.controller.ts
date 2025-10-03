import { IUserService, USER_SERVICE_NAME } from '@app/common';
import { Controller, Get, Inject, OnModuleInit, UseInterceptors } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { ClientEnum } from '../../common/enums/client.enum';
import { GrpcErrorInterceptor } from '../../common/interceptors/grpc-error.interceptor';

@Controller('auth')
@UseInterceptors(GrpcErrorInterceptor)
export class AuthController implements OnModuleInit {
  private userService:IUserService
  constructor(@Inject(ClientEnum.USER_SERVICE) private readonly client:ClientGrpc) {}
  onModuleInit() {
    this.userService=this.client.getService<IUserService>(USER_SERVICE_NAME);
  }

  @Get('test')
  async test() {
    return this.userService.Test({msg:'Hello'});
  }
}
