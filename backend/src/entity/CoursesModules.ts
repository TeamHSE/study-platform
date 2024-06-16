import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "crypto";

@Entity("courses_modules")
export class CoursesModule extends BaseEntity {
  @PrimaryGeneratedColumn()
  moduleId: UUID | undefined;

  @Column({ type: "integer" })
  courseId: UUID | undefined;

  @Column({ type: "varchar", length: 250 })
  name: string | undefined;

  @Column("text")
  description: string | undefined;

  @Column({ default: false, type: "boolean" })
  isVisible: boolean | undefined;

  @Column({ type: "integer" })
  moduleNumber: number | undefined;
}
