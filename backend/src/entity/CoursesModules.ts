import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { CoursesStep } from "./CoursesStep";

@Entity("courses_modules")
export class CoursesModule extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  moduleId: "uuid" | undefined;

  @Column({ type: "uuid" })
  courseId: "uuid" | undefined;

  @Column({ type: "varchar", length: 250 })
  name: string | undefined;

  @Column("text")
  description: string | undefined;

  @ManyToOne(() => Course, (course) => course.modules, {
        onDelete: 'CASCADE',
    })
  course: Course;

  @OneToMany(() => CoursesStep, (course) => course.module, {
        cascade: true,
    })
  steps: CoursesStep[];
}
