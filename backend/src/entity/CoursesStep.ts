import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "crypto";

@Entity("courses_steps")
export class CoursesStep extends BaseEntity {
  @PrimaryGeneratedColumn()
  stepId: UUID | undefined;

  @Column({ type: "integer" })
  moduleId: UUID | undefined;

  @Column({ type: "varchar", length: 250 })
  name: string | undefined;

  @Column("text")
  description: string | undefined;

  @Column({ nullable: true, type: "text" })
  youtubeVideoLink: string | undefined;

  @Column({ default: false, type: "boolean" })
  isVisible: boolean | undefined;

  @Column({ type: "integer" })
  stepNumber: number | undefined;

  @Column({ default: -1, type: "integer" })
  deadline: number | undefined;

  @Column({ default: 1, type: "integer" })
  ratingAward: number | undefined;
}
