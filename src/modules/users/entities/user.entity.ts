import { BaseEntity } from '@/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  email: String;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: String;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: String;

  @Column({ name: 'is_verified', type: 'bit', default: false })
  isVerified: boolean;
}
