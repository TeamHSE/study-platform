import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersRole } from "./UsersRoles";
import { Course } from "./Course";
import { User } from "./User";

@Entity("courses_viewers")
export class CoursesViewer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  viewerId: number | undefined;

  @Column({ type: "integer" })
  userId: number | undefined;

  @Column({ type: "integer" })
  courseId: number | undefined;

  @Column({ type: "integer" })
  roleId: number | undefined;

  @OneToMany(() => UsersRole, (role) => role.viewer)
  roles: UsersRole[];

  @OneToMany(() => User, (user) => user.viewers)
  user: User[];

  @OneToMany(() => Course, (course) => course.viewers)
  course: Course[];
}
