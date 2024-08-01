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

    const existing = await this.verificationRepository.findOne({
      where: { email },
    });

    if (existing) {
      if (existing.isVerified) {
        throw new ConflictException('The email address is already verified.');
      }
      return this.resendEmailVerification(existing);
    }

    const verification = await this.create(email);
    // TODO send email

    return { referenceCode: verification.referenceCode, otp: verification.otp };
  }

  private async resendEmailVerification(
    verification: Verification,
  ): Promise<VerifyEmailDto> {
    const updated = await this.verificationRepository.save({
      ...verification,
      referenceCode: this.generateReferenceCode(),
      otp: this.generateOtp(),
      expireAt: this.calculateExpiryDate(),
    });

    // TODO send email

    return { referenceCode: updated.referenceCode, otp: updated.otp };
  }

  private async create(email: string): Promise<Verification> {
    const verification = this.verificationRepository.create({
      email,
      referenceCode: this.generateReferenceCode(),
      otp: this.generateOtp(),
      isVerified: false,
      expireAt: this.calculateExpiryDate(),
    });
    return this.verificationRepository.save(verification);
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateReferenceCode(): string {
    return crypto.randomBytes(3).toString('hex');
  }

  private calculateExpiryDate(): Date {
    return dayjs()
      .add(
        this.verificationConfig.expireDuration,
        this.verificationConfig.expireUnit,
      )
      .toDate();
  }
}
