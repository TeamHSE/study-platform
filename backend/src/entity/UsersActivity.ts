import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_activity")
export class UsersActivity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  activityId: number | undefined;

  @Column({ type: "integer" })
  userId: number | undefined;

  @Column({ type: "integer" })
  stepId: number | undefined;

  @Column({ type: "timestamp with time zone" })
  timestamp: Date | undefined;
}
