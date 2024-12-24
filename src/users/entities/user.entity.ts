import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: true })
  isActive: boolean;
}
