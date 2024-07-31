import { BaseEntity } from '@/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('verification')
export class Verification extends BaseEntity {
  @Column({ name: 'email', type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({
    name: 'reference_code',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  referenceCode: string;

  @Column({
    name: 'otp',
    type: 'varchar',
    length: 6,
    nullable: false,
  })
  otp: string;

  @Column({ name: 'is_verified', type: 'bit', default: false })
  isVerified: boolean;

  @Column({ name: 'expire_at', type: 'datetime' })
  expireAt: Date;
}
