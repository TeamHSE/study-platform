import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CoursesModule } from "./CoursesModules";

@Entity("courses_steps")
export class CoursesStep extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  stepId: "uuid" | undefined;

  @Column({ type: "uuid" })
  moduleId: "uuid" | undefined;

  @Column({ type: "varchar", length: 250 })
  name: string | undefined;

  @Column("text")
  description: string | undefined;

  @Column({ nullable: true, type: "text" })
  youtubeVideoLink: string | undefined;

  @Column({ default: -1, type: "integer" })
  deadline: number | undefined;

  @Column({ default: 1, type: "integer" })
  ratingAward: number | undefined;

  @ManyToOne(() => CoursesModule, (module) => module.steps)
  module: CoursesModule;
}
