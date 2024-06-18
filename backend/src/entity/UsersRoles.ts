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
  @PrimaryGeneratedColumn({ type: "integer" })
  roleId: number | undefined;

  @Column({ unique: true, type: "varchar", length: 50 })
  name: string | undefined;

  @ManyToOne(() => CoursesViewer, (viewer) => viewer.roles)
  viewer: CoursesViewer;
}
