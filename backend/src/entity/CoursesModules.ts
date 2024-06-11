import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("courses_modules")
export class CoursesModule extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  moduleId: number | undefined;

  @Column({ type: "integer" })
  courseId: number | undefined;

  @Column({ type: "varchar", length: 250 })
  name: string | undefined;

  @Column("text")
  description: string | undefined;

  @Column({ default: false, type: "boolean" })
  isVisible: boolean | undefined;

  @Column({ type: "integer" })
  moduleNumber: number | undefined;
}
