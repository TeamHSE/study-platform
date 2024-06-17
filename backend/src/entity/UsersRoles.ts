import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_roles")
export class UsersRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  roleId: number | undefined;

  @Column({ unique: true, type: "varchar", length: 50 })
  name: string | undefined;
}
