import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity("courses_viewers")
export class CoursesViewer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  viewerId: "uuid" | undefined;

  @Column({ type: "uuid" })
  userId: "uuid" | undefined;

  @Column({ type: "uuid" })
  courseId: "uuid" | undefined;

  @OneToMany(() => User, (user) => user.viewers, {
        cascade: true,
    })
  user: User[];

  @OneToMany(() => Course, (course) => course.viewers, {
        cascade: true,
    })
  course: Course[];
}
