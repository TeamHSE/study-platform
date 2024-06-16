import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "crypto";
@Entity("courses")
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  courseId: UUID | undefined;

  @Column({ unique: true, type: "varchar", length: 250 })
  name: string | undefined;

  @Column("text")
  description: string | undefined;

  @Column({ default: false, type: "boolean" })
  isVisible: boolean | undefined;
}
