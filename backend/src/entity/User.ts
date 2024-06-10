import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import { UUID } from "crypto";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  userId: UUID;

  @Column({ type: "varchar", length: 50 })
  firstName: string;

  @Column({ type: "varchar", length: 50 })
  lastName: string;

  @Column({ unique: true, type: "varchar", length: 50 })
  username: string;

  @Column({ unique: true, type: "varchar", length: 100 })
  email: string;

  @Column("text")
  password: string;

  @Column({ nullable: true, type: "boolean" })
  isMale: boolean;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "double precision", nullable: true })
  weight: number;

  @Column({ type: "double precision", nullable: true })
  height: number;

  @Column({ type: "text", nullable: true })
  achievements: string;

  @Column({ type: "text", nullable: true })
  healthIssues: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
