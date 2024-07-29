import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: String;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: String;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: String;
}
