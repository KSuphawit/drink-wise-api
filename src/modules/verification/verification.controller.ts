import { EmailVerifiactionRequest } from '@/modules/verification/dto/requests/email-verification.request';
import { VerifyEmailRequest } from '@/modules/verification/dto/requests/verify-email.request';
import { VerificationService } from '@/modules/verification/verification.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('request-email-verification')
  async requestEmailVerification(
    @Body() emailVerfiicationRequest: EmailVerifiactionRequest,
  ): Promise<VerifyEmailDto> {
    return this.verificationService.requestEmailVerification(
      emailVerfiicationRequest.email,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailRequst: VerifyEmailRequest) {
    return this.verificationService.verifyEmail(
      verifyEmailRequst.email,
      verifyEmailRequst.otp,
      verifyEmailRequst.referenceCode,
    );
  }
}
