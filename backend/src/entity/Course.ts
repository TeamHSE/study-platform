import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("courses")
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  courseId: "uuid" | undefined;

  @Column({ unique: true, type: "varchar", length: 250 })
  name: string | undefined;

  @Column("text")
  description: string | undefined;

  @Column({ default: false, type: "boolean" })
  isVisible: boolean | undefined;
}
