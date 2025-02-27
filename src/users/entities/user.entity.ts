import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  nickname: string;

  @Column({
    unique: true,
    comment: 'account can be username, email or phone',
  })
  username: string;

  @Column({
    unique: true,
    nullable: true,
    comment: 'account can be username, email or phone',
  })
  email?: string;

  @Column({
    unique: true,
    nullable: true,
    comment: 'account can be username, email or phone',
  })
  phone?: string;

  @Column()
  password: string;
}
