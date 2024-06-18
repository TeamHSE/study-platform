import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CoursesModule } from "./CoursesModules";
import { UsersActivity } from "./UsersActivity";

@Entity("courses_steps")
export class CoursesStep extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  stepId: number | undefined;

  @Column({ type: "integer" })
  moduleId: number | undefined;

  @Column({ type: "varchar", length: 250 })
  name: string | undefined;

  @Column("text")
  description: string | undefined;

  @Column({ nullable: true, type: "text" })
  youtubeVideoLink: string | undefined;

  @Column({ default: false, type: "boolean" })
  isVisible: boolean | undefined;

  @Column({ type: "integer" })
  stepNumber: number | undefined;

  @Column({ default: -1, type: "integer" })
  deadline: number | undefined;

  @Column({ default: 1, type: "integer" })
  ratingAward: number | undefined;

  @OneToMany(() => UsersActivity, (activity) => activity.step)
  activities: UsersActivity[];

  @ManyToOne(() => CoursesModule, (module) => module.steps)
  module: CoursesModule;
}
