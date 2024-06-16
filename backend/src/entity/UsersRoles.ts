import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "crypto";

@Entity("users_roles")
export class UsersRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "UUID" })
  roleId: UUID | undefined;

  @Column({ unique: true, type: "varchar", length: 50 })
  name: string | undefined;
}
