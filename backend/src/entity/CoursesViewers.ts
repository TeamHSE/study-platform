import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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
}
