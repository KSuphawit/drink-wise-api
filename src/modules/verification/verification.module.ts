import { Verification } from '@/modules/verification/entities/verification.entity';
import { VerificationController } from '@/modules/verification/verification.controller';
import { VerificationService } from '@/modules/verification/verification.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Verification])],
  providers: [VerificationService],
  controllers: [VerificationController],
})
export default class VerifiactionModule {}
