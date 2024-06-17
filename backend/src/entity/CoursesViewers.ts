import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
