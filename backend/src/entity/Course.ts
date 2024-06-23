import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { CoursesModule } from "./CoursesModules";
import { CoursesViewer } from "./CoursesViewers";

@Entity("courses")
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  courseId: "uuid" | undefined;

  @Column({ unique: true, type: "varchar", length: 250 })
  name: string;

  @Column("text")
  description: string;

  @Column({ default: false, type: "boolean" })
  isVisible: boolean;

  @OneToMany(() => CoursesModule, (module) => module.course)
  modules: CoursesModule[];

  @ManyToOne(() => CoursesViewer, (viewer) => viewer.user)
  viewers: CoursesViewer;
}
