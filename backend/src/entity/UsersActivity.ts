import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_activity")
export class UsersActivity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  activityId: string | undefined;

  @Column({ type: "uuid" })
  userId: string | undefined;

  @Column({ type: "uuid" })
  stepId: string | undefined;

  @Column({ type: "timestamp with time zone" })
  timestamp: Date | undefined;
}
