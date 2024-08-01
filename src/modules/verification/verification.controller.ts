import { VerificationService } from '@/modules/verification/verification.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/request-email-verification')
  async requestEmailVerification(
    @Body('email') email: string,
  ): Promise<VerifyEmailDto> {
    return this.verificationService.requestEmailVerification(email);
  }
}
