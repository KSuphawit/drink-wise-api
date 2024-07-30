import { UserDTO } from '@/modules/user/dto/user.dto';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export default class UserSecureInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserDTO | UserDTO[]>,
  ): Observable<any> | Promise<any> {
    return next.handle().pipe(map((data) => plainToInstance(UserDTO, data)));
  }
}
