import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CoursesViewer } from "./CoursesViewers";

@Entity("users_roles")
export class UsersRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  roleId: string;

  @Column({ unique: true, type: "varchar", length: 50 })
  name: string | undefined;

  @ManyToOne(() => CoursesViewer, (viewer) => viewer.roles)
  viewer: CoursesViewer;
}

// TODO(seed) : add maintainer, contributor, viewer
