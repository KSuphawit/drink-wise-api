import { VerificationConfiguration } from '@/config/verification.configuration';
import { UsersService } from '@/modules/users/users.service';
import { Verification } from '@/modules/verification/entities/verification.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly verificationConfig: VerificationConfiguration,
    private readonly usersService: UsersService,
  ) {}

  async requestEmailVerification(email: string): Promise<VerifyEmailDto> {
    const isUserExists = await this.usersService.findUserByEmail(email);
    if (isUserExists)
      throw new ConflictException(
        'The email address is already in use by another account.',
      );

    const existingVerification = await this.verificationRepository.findOne({
      where: { email },
    });

    if (existingVerification && existingVerification.isVerified) {
      throw new ConflictException('Email is already verified.');
    }

    if (existingVerification && !existingVerification.isVerified) {
      await this.verificationRepository.delete({ email });
    }

    const verification = this.verificationRepository.create({
      email,
      isVerified: false,
      referenceCode: this.generateReferenceCode(),
      otp: this.generateOtp(),
      expireAt: dayjs()
        .add(
          this.verificationConfig.expireDuration,
          this.verificationConfig.expireUnit,
        )
        .toDate(),
    });

    await this.verificationRepository.save(verification);
    // TODO send email

    return { referenceCode: verification.referenceCode, otp: verification.otp };
  }

  async verifyEmail(email: string, otp: string, referenceCode: string) {
    const verification = await this.verificationRepository.findOne({
      where: { email, otp, referenceCode },
    });

    if (verification.expireAt < dayjs().toDate()) {
      throw new Error('OTP expired');
    }

    await this.verificationRepository.save({
      ...verification,
      isVerified: true,
    });
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateReferenceCode(): string {
    return crypto.randomBytes(3).toString('hex');
  }
}
