import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "crypto";

@Entity("users_activity")
export class UsersActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  activityId: UUID | undefined;

  @Column({ type: "UUID" })
  userId: UUID | undefined;

  @Column({ type: "UUID" })
  stepId: UUID | undefined;

  @Column({ type: "timestamp with time zone" })
  timestamp: Date | undefined;
}
