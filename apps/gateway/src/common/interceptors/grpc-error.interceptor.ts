import { 
    NestInterceptor, 
    NotFoundException, 
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    NotImplementedException
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { GrpcStatus } from "@app/common";

export class GrpcErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                this.handleError(error);
                return throwError(() => error);
            })
        );
    }
    
    private handleError(error: any) {
        // Handle RpcException with code and message
        if (error.code !== undefined) {
            switch(error.code) {
                case GrpcStatus.NOT_FOUND:
                    throw new NotFoundException(error.details || 'Resource not found');
                case GrpcStatus.INVALID_ARGUMENT:
                    throw new BadRequestException(error.details || 'Invalid argument');
                case GrpcStatus.UNAUTHENTICATED:
                    throw new UnauthorizedException(error.details || 'Unauthenticated');
                case GrpcStatus.PERMISSION_DENIED:
                    throw new ForbiddenException(error.details || 'Permission denied');
                case GrpcStatus.ALREADY_EXISTS:
                    throw new ConflictException(error.details || 'Resource already exists');
                case GrpcStatus.INTERNAL:
                    throw new InternalServerErrorException(error.details || 'Internal server error');
                case GrpcStatus.UNAVAILABLE:
                    throw new ServiceUnavailableException(error.details || 'Service unavailable');
                case GrpcStatus.UNIMPLEMENTED:
                    throw new NotImplementedException(error.details || 'Not implemented');
                case GrpcStatus.CANCELLED:
                case GrpcStatus.DEADLINE_EXCEEDED:
                case GrpcStatus.RESOURCE_EXHAUSTED:
                case GrpcStatus.FAILED_PRECONDITION:
                case GrpcStatus.ABORTED:
                case GrpcStatus.OUT_OF_RANGE:
                case GrpcStatus.DATA_LOSS:
                case GrpcStatus.UNKNOWN:
                default:
                    throw new InternalServerErrorException(error.details || 'Internal server error');
            }
        }
        
        // Handle string errors from RpcException
        if (typeof error === 'string') {
            throw new InternalServerErrorException(error);
        }
        
        // Handle other error types
        throw new InternalServerErrorException('An unexpected error occurred');
    }
}