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
  @PrimaryGeneratedColumn("uuid")
  viewerId: "uuid" | undefined;

  @Column({ type: "uuid" })
  userId: "uuid" | undefined;

  @Column({ type: "uuid" })
  courseId: "uuid" | undefined;

  @Column({ type: "uuid" })
  roleId: "uuid" | undefined;

  @OneToMany(() => UsersRole, (role) => role.viewer)
  roles: UsersRole[];

  @OneToMany(() => User, (user) => user.viewers)
  user: User[];

  @OneToMany(() => Course, (course) => course.viewers)
  course: Course[];

}
