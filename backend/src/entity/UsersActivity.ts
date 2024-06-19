import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { CoursesStep } from "./CoursesStep";

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

  @ManyToOne(() => User, (user) => user.activities)
  user: User;

  @ManyToOne(() => CoursesStep, (step) => step.activities)
  step: CoursesStep;
}
