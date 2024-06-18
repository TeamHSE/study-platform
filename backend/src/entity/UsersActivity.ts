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
  @PrimaryGeneratedColumn({ type: "integer" })
  activityId: number | undefined;

  @Column({ type: "integer" })
  userId: number | undefined;

  @Column({ type: "integer" })
  stepId: number | undefined;

  @Column({ type: "timestamp with time zone" })
  timestamp: Date | undefined;

  @ManyToOne(() => User, (user) => user.activities)
  user: User;

  @ManyToOne(() => CoursesStep, (step) => step.activities)
  step: CoursesStep;
}
