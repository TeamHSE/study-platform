import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { CoursesModule } from "./CoursesModules";
import { CoursesStep } from "./CoursesStep";
import { CoursesViewer } from "./CoursesViewers";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

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
