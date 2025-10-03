import { GrpcStatus, type ITest } from '@app/common';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {

  Test(data: ITest): ITest {

    if(data) throw new RpcException({code:GrpcStatus.NOT_FOUND,message:'not found'})
    throw new RpcException('error')
    return {
      msg: 'Hello World!',  
    };
  }
}
