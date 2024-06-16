import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "crypto";

@Entity("courses_viewers")
export class CoursesViewer extends BaseEntity {
  @PrimaryGeneratedColumn()
  viewerId: UUID | undefined;

  @Column({ type: "UUID" })
  userId: UUID | undefined;

  @Column({ type: "UUID" })
  courseId: UUID | undefined;

  @Column({ type: "UUID" })
  roleId: UUID | undefined;
}
