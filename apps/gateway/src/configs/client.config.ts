import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";


export const clientConfig: MicroserviceOptions[] =[
    {
        transport: Transport.GRPC,
        options: {
            package: 'user',
            protoPath: join(__dirname, 'protos/user.proto'),
            url: process.env.USER_GRPC_URL,
          
        }
    },
]