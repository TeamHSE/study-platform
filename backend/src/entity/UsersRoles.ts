import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { CoursesViewer } from "./CoursesViewers";

@Entity("users_roles")
export class UsersRole extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  roleId: "uuid" | undefined;

  @Column({ unique: true, type: "varchar", length: 50 })
  name: string | undefined;

  @ManyToOne(() => CoursesViewer, (viewer) => viewer.roles)
  viewer: CoursesViewer;
}
