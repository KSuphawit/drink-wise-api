import { UserDto } from '@/modules/users/dto/user.dto';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class UsersTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserDto | UserDto[]>,
  ): Observable<any> | Promise<any> {
    return next.handle().pipe(map((data) => plainToInstance(UserDto, data)));
  }
}
